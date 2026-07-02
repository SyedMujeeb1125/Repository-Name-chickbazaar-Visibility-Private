import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  orders: any[];
  onOrderPress: (id: string) => void;
};

export default function OrdersSection({
  orders,
  onOrderPress,
}: Props) {
  return (
    <Card>
      <Text style={styles.heading}>
        📦 Recent Orders
      </Text>

      {orders.length === 0 ? (
        <Text style={styles.empty}>
          No recent orders.
        </Text>
      ) : (
        orders.map((order: any) => (
          <TouchableOpacity
            key={order.id}
            style={styles.item}
            onPress={() =>
              onOrderPress(order.id)
            }
          >
            <View>
              <Text style={styles.number}>
                {order.order_number ??
                  order.orderNumber}
              </Text>

              <Text style={styles.status}>
                {String(order.status)
                  .replace("_", " ")
                  .toUpperCase()}
              </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.amount}>
                ₹
                {Number(
                  order.final_amount ??
                    order.finalAmount ??
                    order.estimated_amount ??
                    order.estimatedAmount ??
                    0
                ).toLocaleString()}
              </Text>

              <Text style={styles.view}>
                View →
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  number: {
    fontWeight: "700",
    fontSize: 16,
    color: "#0F172A",
  },

  status: {
    marginTop: 5,
    color: "#16A34A",
    fontSize: 14,
  },

  amount: {
    fontWeight: "700",
    color: "#0F172A",
  },

  view: {
    marginTop: 4,
    color: "#2563EB",
    fontSize: 13,
  },

  empty: {
    color: "#94A3B8",
    textAlign: "center",
    paddingVertical: 20,
  },
});