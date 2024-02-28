import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems={"center"}
        p={2}
        pr={4}
        rounded={"md"}
        mb={3}
      >
        <Image
          source={{
            uri: "https://www.origym.com.br/midia/remada-unilateral-3.jpg",
          }}
          alt={"imagem do exercício"}
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize={"lg"} color="white" numberOfLines={2}>
            Remada Unilateral
          </Heading>
          <Text fontSize={"sm"} color="gray.200" mt={1}>
            2 séries x 12 repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name={"chevron-right"} color={"gray.300"} />
      </HStack>
    </TouchableOpacity>
  );
}
