'use client'

import { useState } from 'react';
import { Row, Col, List, DatePicker, Button, Form, Input, Card } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

interface Task {
  id: number;
  date: string;
  task: string;
}

const mockEmails: string[] = ['email1@example.com', 'email2@example.com', 'email3@example.com'];
const mockTasks: Record<string, Task[]> = {
  'email1@example.com': [
    { id: 1, date: '2024-01-01', task: 'Task 1 for email 1' },
    { id: 2, date: '2024-01-02', task: 'Task 2 for email 1' },
  ],
  'email2@example.com': [
    { id: 3, date: '2024-01-01', task: 'Task 1 for email 2' },
    { id: 4, date: '2024-01-03', task: 'Task 2 for email 2' },
  ],
  'email3@example.com': [],
};

const EmailTasksManager: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const handleEmailClick = (email: string): void => {
    setSelectedEmail(email);
    setFilteredTasks(mockTasks[email] || []);
    setSelectedTask(null);
  };

  const handleTaskClick = (task: Task): void => {
    setSelectedTask(task);
  };

  const handleDateFilter = (dates: [moment.Moment, moment.Moment]): void => {
    const [start, end] = dates;
    const filtered: Task[] = mockTasks[selectedEmail!]?.filter(task => {
      const taskDate = moment(task.date);
      return taskDate.isBetween(start, end, 'days', '[]');
    }) || [];
    setFilteredTasks(filtered);
  };

  return (
      <Row gutter={16} style={{ padding: '20px', backgroundColor: '#F0F2F5' }}>
        <Col span={8}>
          <Card title="Emails" style={{ overflow: 'auto', height: '90vh' }}>
            <List
                dataSource={mockEmails}
                renderItem={(item: string) => (
                    <List.Item onClick={() => handleEmailClick(item)} style={{ cursor: 'pointer' }}>
                      {item}
                    </List.Item>
                )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={`Tasks for ${selectedEmail || ''}`} style={{ overflow: 'auto', height: '90vh' }}>
            <div style={{ marginBottom: '20px' }}>
              <RangePicker onChange={(dates) => handleDateFilter(dates as [moment.Moment, moment.Moment])} />
              <Button style={{ margin: '0 5px' }}>Button 1</Button>
              <Button style={{ margin: '0 5px' }}>Button 2</Button>
              <Button style={{ margin: '0 5px' }}>Button 3</Button>
            </div>
            <List
                dataSource={filteredTasks}
                renderItem={(item: Task) => (
                    <List.Item onClick={() => handleTaskClick(item)} style={{ cursor: 'pointer' }}>
                      {item.date}: {item.task}
                    </List.Item>
                )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Task Details" style={{ height: '90vh' }}>
            {selectedTask ? (
                <Form layout="vertical">
                  <Form.Item label="Date">
                    <Input defaultValue={selectedTask.date} />
                  </Form.Item>
                  <Form.Item label="Task">
                    <Input defaultValue={selectedTask.task} />
                  </Form.Item>
                </Form>
            ) : (
                <div>Select a task to edit</div>
            )}
          </Card>
        </Col>
      </Row>
  );
};

export default EmailTasksManager;
