import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Dashboard Component
const Dashboard = () => {
  const [stats, setStats] = useState(null);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile Summary Card */}
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-2">Profile Summary</h3>
          <div className="space-y-2">
            <p>Total Problems Solved: 150</p>
            <p>Current Streak: 5 days</p>
            <p>College Rank: #25</p>
          </div>
        </Card>

        {/* Upcoming Assignments */}
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-2">Upcoming Assignments</h3>
          <div className="space-y-2">
            <p>Data Structures - Due in 2 days</p>
            <p>Algorithms - Due in 5 days</p>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-2">Recent Activity</h3>
          <div className="space-y-2">
            <p>Solved "Two Sum" - 2 hours ago</p>
            <p>Submitted Assignment - 5 hours ago</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Profile Integration Component
const ProfileIntegration = () => {
  const [platforms, setPlatforms] = useState([]);
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Platform Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['leetcode', 'codeforces', 'codechef', 'gfg', 'hackerrank'].map((platform) => (
          <Card key={platform} className="p-4">
            <h3 className="text-lg font-bold capitalize mb-2">{platform}</h3>
            <input 
              type="text" 
              placeholder="Enter username"
              className="border p-2 rounded w-full mb-2"
            />
            <Button className="w-full">Connect</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Problem Solving Component
const ProblemSolving = () => {
  const [code, setCode] = useState('');
  
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-2">Problem Description</h3>
          <div className="prose max-w-none">
            <h4>Two Sum</h4>
            <p>Given an array of integers nums and an integer target...</p>
            <h5>Example:</h5>
            <pre>Input: nums = [2,7,11,15], target = 9
Output: [0,1]</pre>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-2">Code Editor</h3>
          <textarea 
            className="w-full h-64 font-mono p-2 border rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="mt-4 space-x-2">
            <Button>Run Code</Button>
            <Button>Submit</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Assignment Management Component
const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);

  return (
    <div className="p-6">
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-bold">Data Structures Week 1</h3>
              <p className="text-gray-600">Due: 2 days</p>
              <p>Progress: 2/5 problems solved</p>
              <Button className="mt-2">Continue</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation would go here */}
      <Dashboard />
      <ProfileIntegration />
      <ProblemSolving />
      <AssignmentManagement />
    </div>
  );
}
