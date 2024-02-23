import { IInputProps, Input as NativeBaseInput } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.700"
      height={12}
      px={10}
      borderWidth={0}
      fontSize={"md"}
      color={"white"}
      fontFamily={"body"}
      mb={4}
      placeholderTextColor={"coolGray.300"}
      _focus={{
        bg: "gray.700",
        borderWidth: 1,
        borderColor: "green.500",
      }}
      {...rest}
    />
  );
}
