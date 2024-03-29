import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "src/service/api";

import { Feather } from "@expo/vector-icons";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

import BodySvg from "@assets/body.svg";
import Series from "@assets/series.svg";
import Repetitions from "@assets/repetitions.svg";

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const toast = useToast();

  const { exerciseId } = route.params as RouteParamsProps;

  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sendingRegister, setSendingRegister] = useState<boolean>(false);

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isApiError = error instanceof AppError;
      const title = isApiError
        ? error.message
        : "Erro ao carregar os detalhes do exercício";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);

      await api.post("history", { exercise_id: exerciseId });

      toast.show({
        title: "Parabens! Exercício registrado com sucesso!",
        placement: "top",
        bgColor: "green.700",
      });

      navigation.navigate("history");
    } catch (error) {
      const isApiError = error instanceof AppError;
      const title = isApiError
        ? error.message
        : "Erro ao registrar o exercício";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg={"gray.600"} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name={"arrow-left"} color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          justifyContent={"space-between"}
          mt={4}
          mb={8}
          alignItems={"center"}
        >
          <Heading
            color="gray.100"
            fontSize={"lg"}
            flexShrink={1}
            fontFamily={"heading"}
          >
            {exercise.name}
          </Heading>
          <HStack alignItems={"center"}>
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform={"capitalize"}>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box mb={3} rounded={"lg"} overflow={"hidden"}>
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}exercise/demo/${exercise.demo}`,
                }}
                alt="nome do exercise"
                resizeMode="cover"
              />
            </Box>
            <Box bg={"gray.600"} rounded={"md"} pb={4} px={4}>
              <HStack
                alignItems={"center"}
                justifyContent={"space-around"}
                mb={6}
                my={5}
              >
                <HStack>
                  <Series />
                  <Text color="gray.200" ml="2">
                    {exercise.series} series
                  </Text>
                </HStack>
                <HStack>
                  <Repetitions />
                  <Text color="gray.200" ml="2">
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                title="Marcar como realizado"
                isDisabled={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
