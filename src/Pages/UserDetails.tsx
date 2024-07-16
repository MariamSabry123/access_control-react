import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';

interface Organization {
  _id: string;
  organizationName: string;
}

interface Permission {
  _id: string;
  organizationName: string;
}

interface User {
  _id: string;
  organizationId: Organization;
  permissionId: Permission;
  userStatus: boolean;
  businessUserId: number;
  username: string;
  userPassword: string;
  userMobileNumber: string;
  userNationalID: string;
  userEmail: string;
  __v: number;
  lastLoginAt?: string;
}

const UserDetails: React.FC = () => {
  const location = useLocation();
  const { user } = location.state as { user: User };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>User Details</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Field</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Username</Td>
            <Td>{user.username}</Td>
          </Tr>
          <Tr>
            <Td>Email</Td>
            <Td>{user.userEmail}</Td>
          </Tr>
          <Tr>
            <Td>Mobile Number</Td>
            <Td>{user.userMobileNumber}</Td>
          </Tr>
          <Tr>
            <Td>Organization Name</Td>
            <Td>{user.organizationId.organizationName}</Td>
          </Tr>
          <Tr>
            <Td>Permission ID</Td>
            <Td>{user.permissionId._id}</Td>
          </Tr>
          <Tr>
            <Td>User Status</Td>
            <Td>{user.userStatus ? 'Active' : 'Inactive'}</Td>
          </Tr>
          <Tr>
            <Td>Business User ID</Td>
            <Td>{user.businessUserId}</Td>
          </Tr>
          <Tr>
            <Td>National ID</Td>
            <Td>{user.userNationalID}</Td>
          </Tr>
          <Tr>
            <Td>Last Login At</Td>
            <Td>{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'N/A'}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

export default UserDetails;
