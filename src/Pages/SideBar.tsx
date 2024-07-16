// src/components/Sidebar.tsx
import React from 'react';
import { Box, Button, VStack, Heading, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex >
    <Box
      width="20%" // Adjusted to 30% as per your requirement
      height="95vh" // Adjusted to leave 5% space at the top and bottom
      bg="#403d39"
      color="white"
      p={4}
      borderTopRightRadius="10%" // Added border radius to the top right corner
      borderBottomRightRadius="10%" // Added border radius to the bottom right corner
      position="fixed"
      left={0}
      top="2%"
      bottom="2%"
    >
      <Flex direction="column" height="100%">
        <Box mb={8}>
          <Heading size="lg" textAlign="right">
            Admin 
          </Heading>
        </Box>
        <VStack spacing={4} align="flex-start" flex="1">
          <Button
            bg="#403d39"
            color="white"
            variant="solid"
            _hover={{ bg: '#625d57' }}
            onClick={() => navigate('/organization')}
          >
            Organization
          </Button>
          <Button
            bg="#403d39"
            color="white"
            variant="solid"
            _hover={{ bg: '#625d57' }}
            onClick={() => navigate('/organization-sheet')}
          >
            Organization Sheets
          </Button>
          <Button
            bg="#403d39"
            color="white"
            variant="solid"
            _hover={{ bg: '#625d57' }}
            onClick={() => navigate('/summary-report')}
          >
           Summary Report
          </Button>
        </VStack>
      </Flex>
    </Box>
    </Flex>
  );
};

export default Sidebar;
