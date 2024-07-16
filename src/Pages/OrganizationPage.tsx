import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Grid, GridItem, Image, Heading, Input, useDisclosure, Text, Center } from '@chakra-ui/react';
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
  image: string;
  mimeType: string; // Add MIME type field
}

const OrganizationPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [data, setData] = useState<Organization[]>([]);
  const [newOrganization, setNewOrganization] = useState({
    licenseId: '',
    orgStatus: true,
    organizationType: '',
    organizationName: '',
    organizationFinancialId: '',
    financialLimitFrom: '',
    financialLimitTo: '',
    bankAccount: '',
    organizationAttachments: '',
    image: '',
    mimeType: '', // Add MIME type field
  });

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('https://super-app-backend-production.up.railway.app/organizations/getAllOrganizations');
        const result = await response.json();
        if (response.ok) {
          setData(result.organizations || []);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrganization((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result?.toString().split(',')[1]; // Extract base64 string
        const mimeType = file.type; // Get MIME type
        setNewOrganization((prev) => ({
          ...prev,
          [name]: base64Image,
          mimeType, // Store MIME type
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('https://super-ahttps://super-app-backend-production.up.railway.app/pp-backend.onrender.com/organizations/createNewOrganization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newOrganization,
          financialLimitFrom: Number(newOrganization.financialLimitFrom),
          financialLimitTo: Number(newOrganization.financialLimitTo),
          bankAccount: Number(newOrganization.bankAccount),
          organizationAttachments: newOrganization.organizationAttachments.split(',').map(att => att.trim()),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setData((prev) => [
          ...prev,
          result.createdOrganization,
        ]);
        onClose();
        setNewOrganization({
          licenseId: '',
          orgStatus: true,
          organizationType: '',
          organizationName: '',
          organizationFinancialId: '',
          financialLimitFrom: '',
          financialLimitTo: '',
          bankAccount: '',
          organizationAttachments: '',
          image: '',
          mimeType: '', // Reset MIME type field
        });
      } else {
        alert(result.message || 'Failed to create organization.');
      }
    } catch (error) {
      console.error('Error creating organization:', error);
      alert('Failed to create organization. Please try again.');
    }
  };

  return (
    <Flex>
      {/* Left part: Sidebar */}
      <Box width="20%">
        <Sidebar />
      </Box>

      {/* Right part: Content */}
      <Box width="80%" p={4}>
        {/* First row: Buttons */}
        <Flex justifyContent="space-between" mb={4}>
          <Button bg="green.500" color='white' onClick={onOpen}>Add New Organization</Button>
          <Button outlineColor='green.500' color='green.500' colorScheme="white" onClick={() => navigate('/organization-sheet')}>
            Add Organization Sheet
          </Button>
        </Flex>

        {/* New organization form */}
        {isOpen && (
          <Box mb={4} p={4} border="1px" borderColor="gray.200" borderRadius="md">
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {/* First column: 4 text fields */}
              <GridItem>
                <Text>Organization Name</Text>
                <Input name="organizationName" value={newOrganization.organizationName} onChange={handleInputChange} placeholder="Organization Name" mb={2} />
                <Text>Organization Status</Text>
                <Input name="orgStatus" value={newOrganization.orgStatus.toString()} onChange={handleInputChange} placeholder="Organization Status" mb={2} />
                <Text>Organization Type</Text>
                <Input name="organizationType" value={newOrganization.organizationType} onChange={handleInputChange} placeholder="Organization Type" mb={2} />
                <Text>Bank account</Text>
                <Input name="bankAccount" value={newOrganization.bankAccount} onChange={handleInputChange} placeholder="Bank account" mb={2} />
              </GridItem>
              {/* Second column: 4 text fields */}
              <GridItem>
                <Text>License Id</Text>
                <Input name="licenseId" value={newOrganization.licenseId} onChange={handleInputChange} placeholder="License Id" mb={2} />
                <Text>Organization Financial ID</Text>
                <Input name="organizationFinancialId" value={newOrganization.organizationFinancialId} onChange={handleInputChange} placeholder="Organization Financial ID" mb={2} />
                <Text>Financial Limit From</Text>
                <Input name="financialLimitFrom" value={newOrganization.financialLimitFrom} onChange={handleInputChange} placeholder="Financial Limit From" mb={2} />
                <Text>Financial Limit to</Text>
                <Input name="financialLimitTo" value={newOrganization.financialLimitTo} onChange={handleInputChange} placeholder="Financial Limit to" mb={2} />
              </GridItem>
              {/* Third column: 2 file upload boxes */}
              <GridItem>
                <Text>Upload Attachments</Text>
                <Input name="organizationAttachments" height='100px' type="file" onChange={handleFileChange} mb={4} />
                <Text>Upload Image</Text>
                <Input name="image" height='100px' type="file" onChange={handleFileChange} mb={4} />
              </GridItem>
            </Grid>
            <Center>
              <Button width='150px' bg="green.500" color='white' mt={4} onClick={handleConfirm}>Confirm</Button>
            </Center>
          </Box>
        )}

        {/* Cards */}
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {data.map((item) => (
            <GridItem key={item._id} bg="white" shadow="md" borderRadius="md" p={4} display="flex" alignItems="center">
              <Image
                boxSize="100px"
                objectFit="cover"
                width='150px'
                src={`data:${item.mimeType};base64,${item.image}`}
                alt={item.organizationName}
                mr={4}
              />
              <Heading size="md" color='green.400'>{item.organizationName}</Heading>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default OrganizationPage;
