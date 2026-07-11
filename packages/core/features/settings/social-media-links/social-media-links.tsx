import React from "react";


import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import SettingsSection from "@nihongo/core/entities/setting/setting-section/settings-section";
import { useRemoteConfig } from "@nihongo/core/shared/contexts/remote-config/remote-config-context";
import { z } from "zod";

const socialMediaLinkSchema = z.object({
  icon: z.string().min(1),
  text: z.string().min(1),
  link: z.url(),
  subtext: z.string(),
});

const socialMediaLinksSchema = z.array(socialMediaLinkSchema);

const SocialMediaLinks: React.FC = () => {
  const { getField } = useRemoteConfig();

  const parsed = socialMediaLinksSchema.safeParse(getField("social_media"));

  if (!parsed.success || parsed.data.length === 0) {
    return null;
  }

  const socialMediaLinks = parsed.data;

  return (
    <SettingsSection>
      {socialMediaLinks.map((link, index) => (
        <SettingItem
          key={index}
          icon={link.icon}
          text={link.text}
          link={link.link}
          isLast={index === socialMediaLinks.length - 1}
        />
      ))}
    </SettingsSection>
  );
};

export default SocialMediaLinks;
