import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Grid, GridItem, Input, Center, Text, Select, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import Sidebar from './SideBar';
import { useNavigate } from 'react-router-dom';

interface Organization {
  _id: string;
  licenseId: string;
  orgStatus: boolean;
  organizationType: string[];
  organizationName: string;
  organizationFinancialId: string;
  financialLimitFrom: number;
  financialLimitTo: number;
  bankAccount: number;
  organizationAttachments: string[];
  __v: number;
}

interface Permission {
  _id: string;
  organizationId: string;
  organizationName: string;
  userStatus: boolean;
  superAdmin: boolean;
  organizationAdmin: boolean;
  merchant: boolean;
  serviceAgent: boolean;
  fieldAgent: boolean;
  inventoryWorker: boolean;
  consumer: boolean;
  __v: number;
}

interface User {
  _id: string;
  organizationId: Organization;
  organizationName: string;
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


const OrganizationSheetPage = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userMobileNumber, setUserMobileNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [nationalID, setNationalID] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleDetailsClick = (user: User) => {
    navigate('/user-details', { state: { user } });
  };
  
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('https://super-app-backend-production.up.railway.app/organizations/getAllOrganizations');
        const result = await response.json();
        if (response.ok) {
          setOrganizations(result.organizations || []);
        } else {
          alert(result.message || 'Failed to fetch organizations.');
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
        alert('Failed to fetch organizations. Please try again.');
      }
    };

    fetchOrganizations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://super-app-backend-production.up.railway.app/users/getAllUsers');
        const result = await response.json();
        if (response.ok) {
          setUsers(result);
        } else {
          alert(result.message || 'Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const organizationId = e.target.value;
    setSelectedOrganizationId(organizationId);
    setSelectedUser(null); // Reset selected user when changing organization
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleFormSubmit = async () => {
    if (!selectedOrganizationId) {
      alert('Please select an organization.');
      return;
    }

    const requestBody = {
      organizationId: selectedOrganizationId,
      organizationName: organizations.find(org => org._id === selectedOrganizationId)?.organizationName || '',
      userStatus: true,
      businessUserId: Date.now(), // Example businessUserId, modify as necessary
      username,
      userPassword,
      userMobileNumber,
      userEmail,
      userNationalID: {
        nationalID, // Example national ID, modify as necessary
        firstName: username.split(' ')[0],
        lastName: username.split(' ')[1] || '',
        address: '123 Main St, Cairo, Egypt', // Example address, modify as necessary
        status: 'Accepted', // Example status, modify as necessary
        gender: 'Male', // Example gender, modify as necessary
        birthdate: '1990-01-01', // Example birthdate, modify as necessary
        manuFactorId: 'MF123456', // Example manuFactorId, modify as necessary
        image: 'image_url_or_base64_encoded_image_data' // Example image, modify as necessary
      },
      permission: {
        superAdmin: false,
        organizationAdmin: false,
        merchant: false,
        serviceAgent: true,
        fieldAgent: false,
        inventoryWorker: false,
        consumer: false
      }
    };

    try {
      const response = await fetch('https://super-app-backend-production.up.railway.app/users/createNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'User Created Successfully');
        // Optionally reset form fields
        setUsername('');
        setUserPassword('');
        setUserMobileNumber('');
        setUserEmail('');
        setNationalID('');
        setRole('');
      } else {
        alert(result.message || 'Failed to create user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <Flex>
      {/* Left part: Sidebar */}
      <Box width="20%">
        <Sidebar />
      </Box>

      {/* Right part: Form */}
      <Box width="80%" p={4}>
        <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {/* First column: Organization and Role */}
            <GridItem>
              <Text>Organization</Text>
              <Select placeholder="Select organization" mb={2} onChange={handleOrganizationChange}>
                {organizations.map(org => (
                  <option key={org._id} value={org._id}>
                    {org.organizationName}
                  </option>
                ))}
              </Select>
              <Text>Role</Text>
              <Select placeholder="Select role" mb={2} value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="SuperAdmin">Super Admin</option>
                <option value="Consumer">Consumer</option>
                <option value="Agent">Agent</option>
                <option value="OrganizationAdmin">Organization Admin</option>
                <option value="merchant">merchant</option>
                <option value="SerciveAgent">Sercive Agent</option>
                <option value="fieldAgent">Field Agent</option>
                <option value="inventoryWorker">Inventory Worker</option>
              </Select>
              <Text>Password</Text>
              <Input placeholder="Password" mb={2} value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            </GridItem>

            {/* Second column: User Name and Phone number */}
            <GridItem>
              <Text>User Name</Text>
              <Input placeholder="User Name" mb={2} value={username} onChange={(e) => setUsername(e.target.value)} />
              <Text>Phone number</Text>
              <Input placeholder="Phone number" mb={2} value={userMobileNumber} onChange={(e) => setUserMobileNumber(e.target.value)} />
            </GridItem>

            {/* Third column: Email and National Id */}
            <GridItem>
              <Text>Email</Text>
              <Input placeholder="Email" mb={2} value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
              <Text>National Id</Text>
              <Input placeholder="National ID" mb={2} value={nationalID} onChange={(e) => setNationalID(e.target.value)} />
            </GridItem>
          </Grid>

          {/* Submit button centered at the bottom */}
          <Center mt={4}>
            <Button bg="green.500" width="100px" color="white" onClick={handleFormSubmit}>Confirm</Button>
          </Center>
        </Box>

        {selectedOrganizationId && (
          <Box mt={4}>
            <Text fontSize="xl" mb={2}>{organizations.find(org => org._id === selectedOrganizationId)?.organizationName}</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>
                  <Th>organization</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users
                  .filter(user => user.organizationId._id === selectedOrganizationId)
                  .map(user => (
                    <Tr key={user._id}>
                      <Td>{user.username}</Td>
                      <Td>{user.userEmail}</Td>
                      <Td>{user.userMobileNumber}</Td>
                      <Td>{user.permissionId.organizationName}</Td>
                      <Td>
                        <Button size="sm" onClick={() => handleDetailsClick(user)}>details</Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default OrganizationSheetPage;
