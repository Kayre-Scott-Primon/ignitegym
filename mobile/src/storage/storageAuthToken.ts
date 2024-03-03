import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN_STORAGE } from "./storageConfig";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
};

export async function storageAuthTokenSave({
  token,
  refresh_token,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    USER_TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token })
  );
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(USER_TOKEN_STORAGE);
  const { token, refresh_token }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : { token: null, refresh_token: null };
  return { token, refresh_token };
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(USER_TOKEN_STORAGE);
}
