import React from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

type Item = {
  id: string;
  title: string;
  subtitle?: string;
};

type Props = {
  visible: boolean;
  title: string;
  items: Item[];
  selectedId?: string;
  onClose: () => void;
  onSelect: (id: string) => void;
};

export default function BottomSheet({
  visible,
  title,
  items,
  selectedId,
  onClose,
  onSelect,
}: Props) {

  return (

    <Modal
      transparent
      animationType="slide"
      visible={visible}
    >

      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >

        <TouchableOpacity
          activeOpacity={1}
          style={styles.sheet}
        >

          <Text style={styles.title}>
            {title}
          </Text>

          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (

              <TouchableOpacity
                style={styles.item}
                onPress={() => {

                  onSelect(item.id);

                  onClose();

                }}
              >

                <View style={{ flex: 1 }}>

                  <Text style={styles.itemTitle}>
                    {item.title}
                  </Text>

                  {!!item.subtitle && (
                    <Text style={styles.subtitle}>
                      {item.subtitle}
                    </Text>
                  )}

                </View>

                {selectedId === item.id && (
                  <Text style={styles.tick}>
                    ✓
                  </Text>
                )}

              </TouchableOpacity>

            )}
          />

        </TouchableOpacity>

      </TouchableOpacity>

    </Modal>

  );

}

const styles = StyleSheet.create({

overlay:{
flex:1,
backgroundColor:"rgba(0,0,0,0.45)",
justifyContent:"flex-end",
},

sheet:{
backgroundColor:"#FFFFFF",
borderTopLeftRadius:28,
borderTopRightRadius:28,
padding:22,
maxHeight:"70%",
},

title:{
fontSize:22,
fontWeight:"700",
marginBottom:20,
},

item:{
flexDirection:"row",
alignItems:"center",
paddingVertical:18,
borderBottomWidth:1,
borderBottomColor:"#F1F5F9",
},

itemTitle:{
fontSize:17,
fontWeight:"600",
color:"#0F172A",
},

subtitle:{
marginTop:4,
color:"#64748B",
},

tick:{
fontSize:22,
color:"#F97316",
fontWeight:"700",
},

});
