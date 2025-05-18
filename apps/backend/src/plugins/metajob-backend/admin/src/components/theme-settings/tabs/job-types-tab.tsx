
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextInput,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { request } from '@strapi/helper-plugin';

interface JobType {
  id: number;
  name: string;
  color: string;
}

const JobTypesTab = () => {
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [newJobType, setNewJobType] = useState({ name: '', color: '#000000' });

  useEffect(() => {
    loadJobTypes();
  }, []);

  const loadJobTypes = async () => {
    try {
      const data = await request('/metajob-backend/job-types', { method: 'GET' });
      setJobTypes(data);
    } catch (error) {
      console.error('Error loading job types:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await request('/metajob-backend/job-types', {
        method: 'POST',
        body: newJobType,
      });
      loadJobTypes();
      setNewJobType({ name: '', color: '#000000' });
    } catch (error) {
      console.error('Error creating job type:', error);
    }
  };

  return (
    <Box padding={4}>
      <Box marginBottom={4}>
        <TextInput
          placeholder="Job Type Name"
          value={newJobType.name}
          onChange={(e) => setNewJobType({ ...newJobType, name: e.target.value })}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="color"
          value={newJobType.color}
          onChange={(e) => setNewJobType({ ...newJobType, color: e.target.value })}
        />
        <Button onClick={handleSubmit} startIcon={<Plus />}>
          Add Job Type
        </Button>
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Color</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobTypes.map((jobType) => (
            <Tr key={jobType.id}>
              <Td>{jobType.name}</Td>
              <Td>
                <Box
                  background={jobType.color}
                  style={{ width: '20px', height: '20px', borderRadius: '4px' }}
                />
              </Td>
              <Td>
                <Button variant="danger">Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default JobTypesTab;
