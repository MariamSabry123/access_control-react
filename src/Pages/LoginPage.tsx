import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  FormControl,
  InputRightElement,
  Image,
  Text,
} from '@chakra-ui/react';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nationalId, setNationalId] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://super-app-backend-production.up.railway.app/users/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: email,
          userPassword: password,
          nationalID: nationalId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === 'Login successful') {
          console.log(data); // Handle the response data as needed
          navigate('/organization'); // Navigate to the organization page on successful login
        } else {
          alert(data.message); // Show the specific message returned from the API
        }
      } else {
        alert(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <Flex
      flexDirection="row"
      width="100vw"
      height="100vh"
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
    >
      {/* Left side image */}
      <Box flex="1">
        <Image src="LoginPhoto.jpg" alt="Image" objectFit="cover" h="100%" />
      </Box>

      {/* Right side content */}
      <Stack
        flex="1"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        p={8}
      >
        <Heading color="black" textAlign="center" mt={4}>
          Login
        </Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <FormControl>
                <Text>Email</Text>
                <InputGroup>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Text>Password</Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    {/* Optionally add icon or left element */}
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <Text>National ID</Text>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="National ID"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="button"
                variant="solid"
                colorScheme="green"
                width="full"
                onClick={handleLogin}
              >
                LOGIN
              </Button>
              <center >
          <Box as="img" src="momknspace green.png" alt="Logo" boxSize="70px" />
        </center>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
