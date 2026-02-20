import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FieldRecord from "./FieldRecord";

type Props = {
  id?: string;
  dateTime: string;
  location: string;
  doctor: string;
  prescription: string;
  diagnosis: string;
  doctorNote: string;
  personalNote: string;
  nextVisit: string;
};

export default function PastVisit(props: Props) {
  const data = props;
  const [showMore, setShowMore] = useState(false);

  const handleEditPastVisit = (data: Props) => {
    router.push({
      pathname: "../pages/editVisitPage",
      params: { visitId: data.id || data.dateTime },
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <FieldRecord
          title="Date and Time"
          icon="calendar"
          content={data.dateTime}
        />
        <Text
          style={styles.editButton}
          onPress={() => handleEditPastVisit(data)}
        >
          Edit
        </Text>
      </View>
      {showMore && (
        <FieldRecord title="Location" icon="map-pin" content={data.location} />
      )}
      {showMore && (
        <FieldRecord title="Doctor" icon="user" content={data.doctor} />
      )}
      {showMore && (
        <FieldRecord
          title="Prescription"
          icon="heart"
          content={data.prescription}
        />
      )}
      {showMore && (
        <FieldRecord
          title="Diagnosis"
          icon="clipboard"
          content={data.diagnosis}
        />
      )}
      {showMore && (
        <FieldRecord
          title="Doctor's Note"
          icon="book"
          content={data.doctorNote}
        />
      )}
      {showMore && (
        <FieldRecord
          title="Personal Note"
          icon="pen-tool"
          content={data.personalNote}
        />
      )}
      {showMore && (
        <FieldRecord title="Next Visit" icon="clock" content={data.nextVisit} />
      )}
      {showMore ? (
        <Text style={styles.showMoreButton} onPress={() => setShowMore(false)}>
          Show Less
        </Text>
      ) : (
        <Text style={styles.showMoreButton} onPress={() => setShowMore(true)}>
          Show More
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#007AFF",
    justifyContent: "flex-start",
    padding: 30,
    width: "90%",
    gap: 20,
  },
  recordTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  editButton: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
  },
  showMoreButton: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-end",
  },
});
