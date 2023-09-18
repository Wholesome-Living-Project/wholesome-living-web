import { Flex, Text, TextField } from "@radix-ui/themes";

type Props = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};
const LoginForm = ({ setEmail, email, setPassword, password }: Props) => {
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
      </label>
    </Flex>
  );
};

export default LoginForm;
