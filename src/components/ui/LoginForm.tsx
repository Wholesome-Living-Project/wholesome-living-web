import { Flex, Text, TextField } from "@radix-ui/themes";

type Props = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  emailHint?: string;
  passwordHint?: string;
};
const LoginForm = ({
  setEmail,
  email,
  setPassword,
  password,
  passwordHint,
  emailHint,
}: Props) => {
  return (
    <Flex direction="column" gap="3">
      <label>
        <Text as="div" size="2" mb="1" weight="bold" color={"gray"}>
          Email
        </Text>
        <TextField.Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputMode={"email"}
          placeholder="Enter your Email"
          size={"3"}
        />
        {emailHint && (
          <Text size="1" color={"red"}>
            {emailHint}
          </Text>
        )}
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold" color={"gray"}>
          Password
        </Text>
        <TextField.Input
          value={password}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          size={"3"}
        />
        {passwordHint && (
          <Text size="1" color={"red"}>
            {passwordHint}
          </Text>
        )}
      </label>
    </Flex>
  );
};

export default LoginForm;
