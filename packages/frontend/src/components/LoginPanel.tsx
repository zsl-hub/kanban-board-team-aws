import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Input,
  LightMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

export default function LoginPanel() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box display="flex" alignItems="center" gap="1rem">
      <LightMode>
        <Button colorScheme="teal" onClick={onOpen}>
          Account
        </Button>
      </LightMode>

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <FormControl display="flex" alignItems="center" gap="1rem">
              <Box display="flex" alignItems="center">
                <Input
                  type="text"
                  id="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Login"
                />
              </Box>

              <Box display="flex" alignItems="center">
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Box>

              <LightMode>
                <Button colorScheme="teal" size="md" onClick={onClose}>
                  Login
                </Button>
              </LightMode>
            </FormControl>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
