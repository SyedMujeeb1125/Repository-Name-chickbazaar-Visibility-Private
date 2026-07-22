import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    createScheduledOrder,
    deleteScheduledOrder,
    getScheduledOrders,
    updateScheduledOrder,
} from "../services/scheduledOrdersService";

import {
    CreateScheduledOrderRequest,
    ScheduledOrder,
    UpdateScheduledOrderRequest,
} from "../types/scheduledOrder";

export default function useScheduledOrders() {

  const [loading, setLoading] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [schedules, setSchedules] =
    useState<ScheduledOrder[]>([]);

  const [error, setError] =
    useState<string | null>(null);

  const loadSchedules =
    useCallback(async () => {

      try {

        setLoading(true);

        setError(null);

        const response =
          await getScheduledOrders();

        setSchedules(
          response.schedules ?? []
        );

      } catch (err: any) {

        setError(
          err.message ??
          "Unable to load schedules."
        );

      } finally {

        setLoading(false);

      }

    }, []);

  useEffect(() => {

    loadSchedules();

  }, [loadSchedules]);

  async function refresh() {

    try {

      setRefreshing(true);

      await loadSchedules();

    } finally {

      setRefreshing(false);

    }

  }

  async function create(
    request: CreateScheduledOrderRequest
  ) {

    await createScheduledOrder(
      request
    );

    await loadSchedules();

  }

  async function update(
    request: UpdateScheduledOrderRequest
  ) {

    await updateScheduledOrder(
      request
    );

    await loadSchedules();

  }

  async function remove(id: string) {

    await deleteScheduledOrder(id);

    await loadSchedules();

  }

  return {

    loading,

    refreshing,

    schedules,

    error,

    refresh,

    create,

    update,

    remove,

  };

}