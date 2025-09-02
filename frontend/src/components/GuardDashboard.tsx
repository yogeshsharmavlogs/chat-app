import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function GuardDashboard() {
  const [passNumber, setPassNumber] = useState("");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannerVisible(false); 
    setPassNumber(data); 
    alert(`QR Scanned: ${data}`);
  };

  const handleSearch = () => {
    console.log("Pass Search:", passNumber);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-base font-semibold text-black mb-2">Scanner</Text>
      <TouchableOpacity
        onPress={() => setScannerVisible(true)}
        className="border border-dashed border-gray-300 bg-gray-50 rounded-lg h-32 items-center justify-center"
      >
        <Ionicons name="scan-outline" size={40} color="#F97316" />
        <Text className="text-orange-500 mt-2 font-medium">Scan e-pass QR</Text>
      </TouchableOpacity>

      <Text className="text-base font-semibold text-black mt-6 mb-2">Pass No.</Text>
      <View className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <TextInput
          value={passNumber}
          onChangeText={setPassNumber}
          placeholder="Enter Pass Number"
          placeholderTextColor="#F97316"
          className="text-base text-black"
        />
        <TouchableOpacity
          onPress={handleSearch}
          className="bg-orange-400 self-end mt-3 px-4 py-2 rounded"
        >
          <Text className="text-white font-semibold">Search Pass</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-0 left-0 right-0 flex-row border-t border-gray-200 bg-white py-2 justify-around">
        <TouchableOpacity className="items-center">
          <Ionicons name="qr-code-outline" size={22} color="#F97316" />
          <Text className="text-xs text-orange-500 mt-1">Scan QR</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="document-text-outline" size={22} color="gray" />
          <Text className="text-xs text-gray-500 mt-1">Daily List</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={scannerVisible} animationType="slide">
        <View className="flex-1 bg-black">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            onPress={() => setScannerVisible(false)}
            className="absolute bottom-10 self-center bg-red-500 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-bold">Close Scanner</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
