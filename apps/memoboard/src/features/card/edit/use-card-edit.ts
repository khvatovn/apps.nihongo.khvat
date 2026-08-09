import { useCallback, useEffect, useState } from "react";

import { Card } from "@/shared/api/get-cards";
import { updateCard } from "@/shared/api/update-card";
import { useBoard } from "@/shared/contexts/board/board-context";

export interface CardEdit {
  canEdit: boolean;
  isEditing: boolean;
  isSaving: boolean;
  hasError: boolean;

  title: string;
  subtitle: string;
  examples: string[];

  setTitle: (value: string) => void;
  setSubtitle: (value: string) => void;

  setExample: (index: number, value: string) => void;
  addExample: () => void;
  removeExample: (index: number) => void;

  start: () => void;
  cancel: () => void;
  save: () => void;
}

export const useCardEdit = (card: Card): CardEdit => {
  const { boardId, canEdit, patchCard } = useBoard();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [title, setTitle] = useState(card.title);
  const [subtitle, setSubtitle] = useState(card.subtitle);
  const [examples, setExamples] = useState(card.examples);

  useEffect(() => {
    setIsEditing(false);
  }, [card.id]);

  const start = useCallback(() => {
    setTitle(card.title);
    setSubtitle(card.subtitle);
    setExamples(card.examples);

    setHasError(false);
    setIsEditing(true);
  }, [card]);

  const cancel = useCallback(() => setIsEditing(false), []);

  const setExample = useCallback((index: number, value: string) => {
    setExamples((prev) => prev.map((item, i) => (i === index ? value : item)));
  }, []);

  const addExample = useCallback(() => setExamples((prev) => [...prev, ""]), []);

  const removeExample = useCallback((index: number) => {
    setExamples((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const save = useCallback(async () => {
    if (!boardId || isSaving) return;

    const fields = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      examples: examples.map((item) => item.trim()).filter(Boolean),
    };

    if (!fields.title) return;

    setIsSaving(true);
    setHasError(false);

    try {
      await updateCard(boardId, card.id, {
        title: fields.title,
        subtitle: fields.subtitle,
        comments: fields.examples,
      });

      patchCard(card.id, fields);
      setIsEditing(false);
    } catch {
      setHasError(true);
    } finally {
      setIsSaving(false);
    }
  }, [boardId, card.id, title, subtitle, examples, isSaving, patchCard]);

  return {
    canEdit: canEdit && Boolean(boardId),
    isEditing,
    isSaving,
    hasError,

    title,
    subtitle,
    examples,

    setTitle,
    setSubtitle,

    setExample,
    addExample,
    removeExample,

    start,
    cancel,
    save,
  };
};
