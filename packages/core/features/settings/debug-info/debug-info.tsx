import React, { useCallback, useEffect, useState } from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import SettingsSection from "@nihongo/core/entities/setting/setting-section/settings-section";
import {
  isBareWorkflow,
  isExpoGo,
  isProductionBuild,
} from "@nihongo/core/shared/constants/environment";
import {
  APP_THEME,
  DEVICE_ID,
  FAILED_TO_REQUEST_NOTIFICATION_TOKEN,
  NOTIFICATION_TOKEN,
  PROMOTION_TELEGRAM_KEY,
  REVIEW_KEY,
} from "@nihongo/core/shared/constants/storageKeys";
import { useResetApp } from "@nihongo/core/shared/contexts/reset-context/reset-context";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import {
  addCustomGateway,
  autoSelect,
  ensureSelected,
  forceSelect,
  getAllGateways,
  getCurrentGateway,
  getGateways,
  probeGateway,
  ProbeResult,
  removeCustomGateway,
} from "@nihongo/core/shared/lib/api-gateway";
import { Typography } from "@nihongo/core/shared/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type RowStatus = "connecting" | "failed";

const IS_DEBUG = false;

const DebugInfo: React.FC = () => {
  const { t } = useTranslation();

  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  const [tapCount, setTapCount] = useState(0);

  const [isVisible, setIsVisible] = useState(false);
  const [notificationToken, setNotificationToken] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [activeGateway, setActiveGateway] = useState<string | null>(getCurrentGateway());

  const [gateways, setGateways] = useState<string[]>(getAllGateways());
  const [rowStatus, setRowStatus] = useState<Record<string, RowStatus>>({});
  const [probes, setProbes] = useState<Record<string, ProbeResult>>({});
  const [newHost, setNewHost] = useState("");

  const { forceReset } = useResetApp();

  const probeOne = useCallback(
    (url: string) =>
      probeGateway(url).then((res: ProbeResult) => setProbes((prev) => ({ ...prev, [url]: res }))),
    [],
  );

  const runProbes = useCallback(
    (urls: string[]) => {
      setProbes({});
      urls.forEach(probeOne);
    },
    [probeOne],
  );

  useEffect(() => {
    if (!isVisible) return;
    AsyncStorage.getItem(NOTIFICATION_TOKEN).then(setNotificationToken);
    AsyncStorage.getItem(DEVICE_ID).then(setDeviceId);

    ensureSelected()
      .then((url: string) => {
        setActiveGateway(url);
        const all = getAllGateways();
        setGateways(all);
        runProbes(all);
      })
      .catch(() => {});

    const id = setInterval(() => setActiveGateway(getCurrentGateway()), 1500);

    return () => clearInterval(id);
  }, [isVisible, runProbes]);

  const selectServer = async (url: string) => {
    if (url === getCurrentGateway()) return;
    setRowStatus((prev) => ({ ...prev, [url]: "connecting" }));

    const ok = await forceSelect(url);

    setRowStatus((prev) => {
      const next = { ...prev };
      if (ok) delete next[url];
      else next[url] = "failed";
      return next;
    });
    if (ok) setActiveGateway(getCurrentGateway());
    probeOne(url);
  };

  const selectAuto = async () => {
    setRowStatus({});
    runProbes(gateways);
    try {
      setActiveGateway(await autoSelect());
    } catch {
      console.log("setActiveGateway error");
    }
  };

  const addHost = async () => {
    try {
      const list = await addCustomGateway(newHost);
      setGateways(list);
      setNewHost("");
      runProbes(list);
    } catch {
      console.log("error addCustomGateway");
    }
  };

  const removeHost = async (url: string) => {
    setGateways(await removeCustomGateway(url));
    setRowStatus((prev) => {
      const next = { ...prev };
      delete next[url];
      return next;
    });
    setProbes((prev) => {
      const next = { ...prev };
      delete next[url];
      return next;
    });
    setActiveGateway(getCurrentGateway());
  };

  const envGateways = getGateways();

  const handleVersionTap = () => {
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 5) {
      setIsVisible(true);
      setTapCount(0);
    }
  };

  const share = (_: string, value: string) => {
    Share.share({ message: `${value}` });
  };

  return (
    <>
      <SettingsSection>
        <SettingItem
          hideArrow
          text={t("settings.version")}
          subText={`v${process.env.VERSION}, build: ${process.env.BUILD_NUMBER} (${Platform.OS})`}
          onClick={handleVersionTap}
        />
        <SettingItem
          isLast
          hideArrow
          text={t("debug.store")}
          subText={`Build for ${process.env.STORE}`}
        />
      </SettingsSection>

      {isVisible && (
        <View style={styles.container}>
          <Pressable style={styles.row} onPress={() => share("Device ID", deviceId ?? "—")}>
            <Text style={styles.label}>{t("debug.deviceId")}</Text>
            <Text style={styles.value} numberOfLines={1}>
              {deviceId ?? "—"}
            </Text>
          </Pressable>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>{t("debug.apiServers")}</Text>
            {gateways.map((url: string) => {
              const isActive = url === activeGateway;
              const status = rowStatus[url];
              const probe = probes[url];

              const unreachable = status === "failed" || (probe && !probe.ok);

              const color = unreachable
                ? colors.TextDanger
                : isActive
                  ? colors.BgAccent
                  : colors.TextSecondary;

              const isCustom = !envGateways.includes(url);

              let meta: string;
              if (status === "connecting") meta = t("debug.checking");
              else if (!probe) meta = t("debug.pinging");
              else if (!probe.ok) meta = t("debug.unreachable");
              else meta = `${probe.region} · ${probe.ms}ms`;

              return (
                <View key={url} style={styles.serverItem}>
                  <View style={styles.serverRow}>
                    <Pressable
                      onPress={() => selectServer(url)}
                      style={[styles.serverRow, { flex: 1 }]}
                    >
                      {status === "connecting" ? (
                        <ActivityIndicator size="small" color={colors.BgAccent} />
                      ) : (
                        <Text style={[styles.value, { color }]}>{isActive ? "●" : "○"}</Text>
                      )}
                      <Text numberOfLines={1} style={[styles.value, styles.serverUrl, { color }]}>
                        {url}
                      </Text>
                    </Pressable>
                    {isCustom && (
                      <Pressable
                        onPress={() => removeHost(url)}
                        hitSlop={8}
                        style={styles.removeButton}
                      >
                        <Text style={[styles.value, { color: colors.TextDanger }]}>✕</Text>
                      </Pressable>
                    )}
                  </View>
                  <Text style={[styles.serverMeta, unreachable && { color: colors.TextDanger }]}>
                    {meta}
                  </Text>
                </View>
              );
            })}

            <Pressable onPress={selectAuto} style={styles.gatewayButton}>
              <Text style={[styles.value, { color: colors.BgAccent }]}>
                ↻ {t("debug.autoSelect")}
              </Text>
            </Pressable>

            <View style={styles.addHostRow}>
              <TextInput
                value={newHost}
                onChangeText={setNewHost}
                placeholder="http://192.168.0.1:3009"
                placeholderTextColor={colors.TextSecondary}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.value, styles.addHostInput, { color: colors.TextPrimary }]}
              />
              <Pressable onPress={addHost} style={styles.gatewayButton}>
                <Text style={[styles.value, { color: colors.BgAccent }]}>
                  + {t("debug.addHost")}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.divider} />
          <Pressable
            style={styles.row}
            onPress={() => share("Notification Token", notificationToken ?? "—")}
          >
            <Text style={styles.label}>{t("debug.notificationToken")}</Text>
            <Text style={styles.value} numberOfLines={2}>
              {notificationToken ?? "-"}
            </Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.row}>
            <Text style={styles.label}>env:</Text>
            <Text style={styles.value} numberOfLines={1}>
              ExpoGo: {JSON.stringify(isExpoGo)}
            </Text>
            <Text style={styles.value} numberOfLines={1}>
              BareWorkflow: {JSON.stringify(isBareWorkflow)}
            </Text>
            <Text style={styles.value} numberOfLines={1}>
              ProductionBuild: {JSON.stringify(isProductionBuild)}
            </Text>
          </Pressable>
        </View>
      )}

      {IS_DEBUG && (
        <SettingsSection>
          <Pressable
            onPress={() => {
              AsyncStorage.removeItem(DEVICE_ID);
              AsyncStorage.removeItem(NOTIFICATION_TOKEN);
              AsyncStorage.removeItem(FAILED_TO_REQUEST_NOTIFICATION_TOKEN);
              AsyncStorage.removeItem(APP_THEME);
              AsyncStorage.removeItem(REVIEW_KEY);
              AsyncStorage.removeItem(PROMOTION_TELEGRAM_KEY);

              forceReset();
            }}
          >
            <Text>{t("debug.removeData")}</Text>
          </Pressable>

          <Text>{process.env.NIHONGO_API_GATEWAY}</Text>
        </SettingsSection>
      )}
    </>
  );
};

export default DebugInfo;

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      borderRadius: 12,
      backgroundColor: colors.BgSecondary,
      padding: 16,
      gap: 8,
    },
    header: {
      color: colors.TextPrimary,
      ...Typography.boldDefault,
    },
    row: {
      gap: 4,
    },
    label: {
      color: colors.TextPrimary,
      ...Typography.regularDefault,
    },
    value: {
      color: colors.TextSecondary,
      ...Typography.regularLabel,
    },
    serverItem: {
      gap: 1,
    },
    serverRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      minHeight: 20,
    },
    serverUrl: {
      flex: 1,
    },
    serverMeta: {
      ...Typography.regularLabel,
      color: colors.TextSecondary,
      marginLeft: 18,
    },
    removeButton: {
      paddingHorizontal: 4,
    },
    gatewayButton: {
      paddingVertical: 4,
    },
    addHostRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 4,
    },
    addHostInput: {
      flex: 1,
      backgroundColor: colors.BgPrimary,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 6,
    },
    divider: {
      height: 1,
      backgroundColor: colors.BorderDefault,
      marginVertical: 4,
    },
  });
