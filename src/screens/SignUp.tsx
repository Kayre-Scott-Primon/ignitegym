import React from "react";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signIpSchema = yup.object({
  name: yup.string().required("Esse campo é obrigatório, informe seu nome"),
  email: yup
    .string()
    .required("Esse campo é obrigatório, informe seu email")
    .email("Email inválido"),
  password: yup
    .string()
    .required("Esse campo é obrigatório, informe a senha")
    .min(6, "Mínimo de 6 caracteres"),
  password_confirm: yup
    .string()
    .required("Esse campo é obrigatório, confirme a senha")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

export function SignUp() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    resolver: yupResolver(signIpSchema),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({
    name,
    email,
    password,
    password_confirm,
  }: FormDataProps) {
    console.log({ name, email, password, password_confirm });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt={"Pessoas treinando"}
          resizeMode="contain"
          position={"absolute"}
          defaultSource={BackgroundImg}
        />
        <Center my={24}>
          <LogoSvg />
          <Text color={"coolGray.100"} fontSize={"sm"}>
            Treine sua mente e seu corpo
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />
          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          mt={12}
          title="Voltar para o Login "
          variant={"outline"}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
