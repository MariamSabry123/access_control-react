import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SideBar';

interface AccessControlEntry {
  _id: string;
  agentId: {
    _id: string;
    organizationName: string;
    username: string; 
  };
  consumerId: {
    _id: string;
    organizationName: string;
  };
  scanedAt: string;
}

const SummaryReport: React.FC = () => {
  const navigate = useNavigate();
  const [accessControlEntries, setAccessControlEntries] = useState<AccessControlEntry[]>([]);

  useEffect(() => {
    const fetchAccessControlEntries = async () => {
      try {
        const response = await fetch('https://super-app-backend-production.up.railway.app/accessControl/getAllAccessControlEntries');
        const data = await response.json();
        if (response.ok) {
          setAccessControlEntries(data.accessControlEntries || []);
        } else {
          alert(data.message || 'Failed to fetch access control entries.');
        }
      } catch (error) {
        console.error('Error fetching access control entries:', error);
        alert('Failed to fetch access control entries. Please try again.');
      }
    };

    fetchAccessControlEntries();
  }, []);

  const handleDetailsClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  return (
    <Box display="flex">
      <Box w="20%">
        <Sidebar />
      </Box>
      <Box w="80%" p={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Access ID</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Consumer Name</Th>
              <Th>Agent Name</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accessControlEntries.map((entry) => (
              <Tr key={entry._id}>
                <Td>{entry._id}</Td>
                <Td>{new Date(entry.scanedAt).toLocaleDateString()}</Td>
                <Td>{new Date(entry.scanedAt).toLocaleTimeString()}</Td>
                <Td>{entry.agentId.username}</Td>
                <Td>{entry.agentId.organizationName}</Td>
                <Td>
                  <Button onClick={() => handleDetailsClick(entry._id)}>Details</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SummaryReport;
