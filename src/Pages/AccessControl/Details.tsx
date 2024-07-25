import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Image, Link } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

interface AccessControlEntry {
  _id: string;
  scanedAt: string;
  agentId: {
    organizationName: string;
    userNationalID: {
      nationalID: string;
      image: string;
    };
    userMobileNumber: string;
    userEmail: string;
    username: string; 
  };
  consumerId: {
    organizationName: string;
    userNationalID: {
      nationalID: string;
      image: string;
    };
    userMobileNumber: string;
    username:string;
  };
}

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<AccessControlEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch('https://super-app-backend-production.up.railway.app/accessControl/getAllAccessControlEntries');
        const data = await response.json();

        if (response.ok) {
          const foundEntry = data.accessControlEntries.find((entry: AccessControlEntry) => entry._id === id);
          if (foundEntry) {
            setEntry(foundEntry);
          } else {
            setError('Entry not found');
          }
        } else {
          setError(data.message || 'Failed to fetch access control entry.');
        }
      } catch (error) {
        console.error('Error fetching access control entry:', error);
        setError('Failed to fetch access control entry. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  if (loading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (error) {
    return <Box p={4}>{error}</Box>;
  }

  if (!entry) {
    return <Box p={4}>No entry found</Box>;
  }

  return (
    <Box p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Field</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Access ID</Td>
            <Td>{entry._id}</Td>
          </Tr>
          <Tr>
            <Td>Date</Td>
            <Td>{new Date(entry.scanedAt).toLocaleDateString()}</Td>
          </Tr>
          <Tr>
            <Td>Time</Td>
            <Td>{new Date(entry.scanedAt).toLocaleTimeString()}</Td>
          </Tr>
          <Tr>
            <Td>Consumer Name</Td>
            <Td>{entry.consumerId.username}</Td>
          </Tr>
          <Tr>
            <Td>Agent Name</Td>
            <Td>{entry.agentId.username}</Td>
          </Tr>
          <Tr>
            <Td>Consumer Mobile</Td>
            <Td>{entry.consumerId.userMobileNumber}</Td>
          </Tr>
          
          <Tr>
            <Td>NID</Td>
            <Td>{entry.agentId.userNationalID.nationalID}</Td>
          </Tr>
          <Tr>
            <Td>Agent Mobile</Td>
            <Td>{entry.agentId.userMobileNumber}</Td>
          </Tr>
          <Tr>
            <Td>Location</Td>
            <Td><Link href={entry.consumerId.userNationalID.image} isExternal>View Map</Link></Td>
          </Tr>
          {/* <Tr>
            <Td>Consumer NID</Td>
            <Td><Image src={entry.consumerId.userNationalID.image} alt="Consumer NID" /></Td>
          </Tr> */}
          <Tr>
            <Td>Email</Td>
            <Td>{entry.agentId.userEmail}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default Details;
