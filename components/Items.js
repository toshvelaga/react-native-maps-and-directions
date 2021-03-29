import React, { useCallback } from "react";
import { TouchableOpacity, Text } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

function Items(props) {
  const renderItem = useCallback(({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 55,
          backgroundColor: isActive ? "#48a971" : "#f0f0f0",
          marginVertical: 2.5,
          borderRadius: 5,
          width: "90%",
          alignSelf: "center",
          paddingLeft: 15,
          justifyContent: "center",
        }}
        onLongPress={drag}
      >
        <Text
          style={{
            color: "black",
            fontSize: 16,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {item.typeOfDelivery + ": "}
          </Text>
          {item.location}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <>
      <DraggableFlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `draggable-item-${item.location}-${index}`
        }
        onDragEnd={props.onDragEnd}
      />
    </>
  );
}

export default Items;
