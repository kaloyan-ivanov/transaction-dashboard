import React from 'react';
import './App.css';
import './output.css';
import { Button } from './ui-components/catalyst/typescript/button';
import { Avatar } from './ui-components/catalyst/typescript/avatar';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell
} from './ui-components/catalyst/typescript/table';

function App() {
  return (
    <div className="App">
      <Button onClick={() => alert('click')}>Click Me</Button>
      <Avatar
        className="size-10"
        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeblvain6UPVuRrUTQePVYc7ymnG2gYtnGDw&s'}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            { handle: 'bobi', name: 'Bobi', email: 'bobi@example.com', access: 'Admin' },
            { handle: 'tihomir', name: 'Tihomir Chobanov', email: 'tihomir@example.com', access: 'User' },
            { handle: 'plamen', name: 'Plamen Tenev', email: 'plamen@example.com', access: 'Guest' }
          ].map((user) => (
            <TableRow key={user.handle}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-zinc-500">{user.access}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
