import React, { useState } from "react";

import { EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import { TextInput, View, StyleSheet, Pressable, Text } from "react-native";
import DatePicker from "react-native-date-picker";

import { ColorsType, useThemeContext } from "../../contexts/theme/theme-context";
import { Typography } from "../../typography";



const formatDate = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
};

interface InputProps {
  placeholder: string;
  onChange?: (val: string) => void;

  value?: string;
  autoFocus?: boolean;

  error?: string;

  isSecure?: boolean;
  isAge?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  value,
  autoFocus,
  isSecure,
  isAge,
  error,
}) => {
  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  const [secureText, setSecureText] = useState(isSecure);

  const [date, setDate] = useState<Date | null>(null);
  const [isOpenAge, setIsOpenAge] = useState(false);

  if (isAge) {
    return (
      <>
        <View style={styles.container}>
          <Pressable style={styles.input} onPress={() => setIsOpenAge(true)}>
            <Text style={[styles.text, date !== null && styles.textActive]}>
              {date === null && placeholder}
              {date !== null && formatDate(date)}
            </Text>
          </Pressable>
        </View>
        <DatePicker
          modal
          open={isOpenAge}
          date={date ?? new Date()}
          mode="date"
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
          onConfirm={(date) => {
            setDate(date);
            onChange?.(date.toString());
            setIsOpenAge(false);
          }}
          onCancel={() => setIsOpenAge(false)}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.TextSecondary}
          onChangeText={onChange}
          value={value}
          autoFocus={autoFocus}
          secureTextEntry={secureText}
        />

        {isSecure && (
          <Pressable style={styles.icon} onPress={() => setSecureText((val) => !val)}>
            {!secureText && <EyeIcon color={colors.BgContrast} />}
            {secureText && <EyeSlashIcon color={colors.BgContrast} />}
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      width: "100%",

      backgroundColor: colors.BgSecondary,
      borderRadius: 12,

      position: "relative",
    },
    input: {
      color: colors.TextPrimary,

      ...Typography.boldDefault,

      paddingHorizontal: 16,

      height: 48,
    },
    text: {
      color: colors.TextSecondary,

      ...Typography.boldDefault,

      paddingVertical: 10,

      height: 48,
    },
    textActive: {
      color: colors.TextPrimary,
    },
    icon: {
      position: "absolute",
      right: 16,
      top: 12,
    },

    error: {
      ...Typography.regularLabel,

      color: colors.TextDanger,
    },
  });

export default Input;
