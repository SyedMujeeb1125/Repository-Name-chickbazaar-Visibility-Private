import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useScheduledOrders from "../hooks/useScheduledOrders";

import {
  CreateScheduledOrderRequest,
  ScheduledOrder,
  ScheduleFrequency,
  UpdateScheduledOrderRequest,
} from "../types/scheduledOrder";

import AddScheduleButton from "../components/scheduled-orders/AddScheduleButton";
import AutoConfirmCard from "../components/scheduled-orders/AutoConfirmCard";
import FrequencySelector from "../components/scheduled-orders/FrequencySelector";
import MonthlySelector from "../components/scheduled-orders/MonthlySelector";
import QuantityCard from "../components/scheduled-orders/QuantityCard";
import ScheduleCard from "../components/scheduled-orders/ScheduleCard";
import WeekdaySelector from "../components/scheduled-orders/WeekdaySelector";

export default function ScheduledOrdersScreen() {

  const {

    schedules,

    loading,

    refreshing,

    error,

    refresh,

    create,

    update,

    remove,

  } = useScheduledOrders();

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [frequency, setFrequency] =
    useState<ScheduleFrequency>("Daily");

  const [weekdays, setWeekdays] =
    useState<number[]>([]);

  const [dayOfMonth, setDayOfMonth] =
    useState(1);

  const [quantityKg, setQuantityKg] =
    useState(200);

  const [autoConfirm, setAutoConfirm] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    if (error) {

      Alert.alert(
        "Scheduled Orders",
        error
      );

    }

  }, [error]);

  const canSave =
    useMemo(() => {

      if (
        frequency === "Weekly"
      ) {

        return (
          weekdays.length > 0 &&
          quantityKg > 0
        );

      }

      return quantityKg > 0;

    }, [
      frequency,
      weekdays,
      quantityKg,
    ]);

  function resetForm() {

    setEditingId(null);

    setFrequency("Daily");

    setWeekdays([]);

    setDayOfMonth(1);

    setQuantityKg(200);

    setAutoConfirm(false);

  }

  function editSchedule(
    schedule: ScheduledOrder
  ) {

    setEditingId(
      schedule.id
    );

    setFrequency(
      schedule.frequency
    );

    setWeekdays(
      schedule.weekdays ?? []
    );

    setDayOfMonth(
      schedule.dayOfMonth ?? 1
    );

    setQuantityKg(
      schedule.quantityKg
    );

    setAutoConfirm(
      schedule.autoConfirm
    );

  }

  async function saveSchedule() {

    if (!canSave) {

      Alert.alert(
        "Incomplete",
        "Please complete all required fields."
      );

      return;

    }

    setSaving(true);

    try {

      if (editingId) {

        const payload:
          UpdateScheduledOrderRequest = {

          id: editingId,

          frequency,

          weekdays,

          dayOfMonth,

          quantityKg,

          autoConfirm,

        };

        await update(payload);

      } else {

        const payload:
          CreateScheduledOrderRequest = {

          frequency,

          weekdays,

          dayOfMonth,

          quantityKg,

          autoConfirm,

        };

        await create(payload);

      }

      resetForm();

    } catch (e: any) {

      Alert.alert(
        "Error",
        e.message ??
        "Unable to save schedule."
      );

    } finally {

      setSaving(false);

    }

  }

  async function deleteSchedule(
    id: string
  ) {

    Alert.alert(

      "Delete Schedule",

      "Are you sure you want to delete this schedule?",

      [

        {
          text: "Cancel",
          style: "cancel",
        },

        {

          text: "Delete",

          style: "destructive",

          onPress: async () => {

            await remove(id);

            if (
              editingId === id
            ) {

              resetForm();

            }

          },

        },

      ]

    );

  }

  if (loading) {

    return (

      <SafeAreaView
        style={styles.loadingContainer}
      >

        <ActivityIndicator
          size="large"
        />

      </SafeAreaView>

    );

  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView

        refreshControl={

          <RefreshControl

            refreshing={
              refreshing
            }

            onRefresh={
              refresh
            }

          />

        }

        contentContainerStyle={
          styles.content
        }
      >
                <Text style={styles.title}>
          Scheduled Orders
        </Text>

        <Text style={styles.subtitle}>
          Create recurring delivery schedules for your shop.
        </Text>

        {schedules.length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyTitle}>
              No Scheduled Orders
            </Text>

            <Text style={styles.emptySubtitle}>
              Create your first recurring order below.
            </Text>

          </View>

        ) : (

          schedules.map(
            (schedule) => (

              <ScheduleCard

                key={schedule.id}

                frequency={
                  schedule.frequency
                }

                quantity={
                  schedule.quantityKg
                }

                weekdays={
                  schedule.weekdays
                }

                dayOfMonth={
                  schedule.dayOfMonth
                }

                autoConfirm={
                  schedule.autoConfirm
                }

                nextDelivery={
                  schedule.nextConfirmationDate
                }

                onEdit={() =>
                  editSchedule(schedule)
                }

                onDelete={() =>
                  deleteSchedule(
                    schedule.id
                  )
                }

              />

            )
          )

        )}

        <View style={styles.section}>

          <FrequencySelector
            value={frequency}
            onChange={setFrequency}
          />

        </View>

        <View style={styles.section}>

          <QuantityCard
            value={quantityKg}
            onChange={setQuantityKg}
          />

        </View>

        {frequency === "Weekly" && (

          <View style={styles.section}>

            <WeekdaySelector
              selected={weekdays}
              onChange={setWeekdays}
            />

          </View>

        )}

        {frequency === "Monthly" && (

          <View style={styles.section}>

            <MonthlySelector
              value={dayOfMonth}
              onChange={setDayOfMonth}
            />

          </View>

        )}

        <View style={styles.section}>

          <AutoConfirmCard
            value={autoConfirm}
            onChange={
              setAutoConfirm
            }
          />

        </View>

        <View
          style={styles.section}
        >

          <AddScheduleButton

            title={
              editingId
                ? "Update Schedule"
                : "Create Schedule"
            }

            disabled={
              !canSave ||
              saving
            }

            loading={
              saving
            }

            onPress={
              saveSchedule
            }

          />

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles =
  StyleSheet.create({

    container: {

      flex: 1,

      backgroundColor:
        "#FFF8F2",

    },

    loadingContainer: {

      flex: 1,

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "#FFF8F2",

    },

    content: {

      padding: 20,

      paddingBottom: 120,

    },

    title: {

      fontSize: 28,

      fontWeight: "700",

      color: "#111827",

    },

    subtitle: {

      marginTop: 6,

      marginBottom: 24,

      fontSize: 15,

      color: "#6B7280",

    },

    section: {

      marginBottom: 20,

    },

    emptyCard: {

      padding: 20,

      borderRadius: 16,

      backgroundColor: "#FFFFFF",

      marginBottom: 20,

    },

    emptyTitle: {

      fontSize: 18,

      fontWeight: "600",

    },

    emptySubtitle: {

      marginTop: 6,

      color: "#6B7280",

    },

        cancelButton: {

      marginTop: 12,

      alignSelf: "center",

      paddingVertical: 8,

      paddingHorizontal: 16,

    },

    cancelButtonText: {

      color: "#DC2626",

      fontWeight: "600",

      fontSize: 15,

    },

  });