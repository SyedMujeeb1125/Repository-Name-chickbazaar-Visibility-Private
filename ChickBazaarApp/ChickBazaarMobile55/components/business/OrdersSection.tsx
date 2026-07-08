import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  orders: any[];
  onOrderPress: (id: string) => void;
};

export default function OrdersSection({
  orders,
  onOrderPress,
}: Props) {

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Recent Orders
      </Text>

      {orders.length === 0 ? (

        <View style={styles.emptyCard}>

          <Text style={styles.emptyText}>
            No recent orders found.
          </Text>

        </View>

      ) : (

        orders.slice(0, 5).map((order) => (

          <TouchableOpacity
            key={order.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              onOrderPress(order.id)
            }
          >

            <View style={styles.topRow}>

              <View>

                <Text style={styles.orderNo}>
                  {order.order_number ??
                    order.orderNumber}
                </Text>

                <Text style={styles.date}>
                  {new Date(
                    order.created_at ??
                    order.createdAt
                  ).toLocaleDateString()}
                </Text>

              </View>

              <View style={styles.statusBadge}>

                <Text style={styles.statusText}>
                  {String(order.status)
                    .replace("_"," ")
                    .toUpperCase()}
                </Text>

              </View>

            </View>

            <View style={styles.divider} />

            <View style={styles.bottomRow}>

              <View>

                <Text style={styles.label}>
                  Quantity
                </Text>

                <Text style={styles.value}>
                  {order.requestedWeight ??
                    0} kg
                </Text>

              </View>

              <View>

                <Text style={styles.label}>
                  Amount
                </Text>

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

              </View>

            </View>

            <Text style={styles.view}>
              View Details →
            </Text>

          </TouchableOpacity>

        ))

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginBottom: 28,
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 20,

    marginBottom: 16,

    shadowColor: "#000",

    shadowOpacity: 0.07,

    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 5,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderNo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  date: {
    marginTop: 6,
    fontSize: 13,
    color: "#94A3B8",
  },

  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 7,

    borderRadius: 18,

    backgroundColor: "#FFF4E8",
  },

  statusText: {
    color: "#F97316",
    fontSize: 11,
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 18,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 13,
    color: "#94A3B8",
  },

  value: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  amount: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "800",
    color: "#16A34A",
  },

  view: {
    marginTop: 18,
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 14,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    paddingVertical: 42,

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 3,
  },

  emptyText: {
    fontSize: 15,
    color: "#94A3B8",
  },

});