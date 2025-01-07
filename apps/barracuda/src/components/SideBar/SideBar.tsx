import React, { useState, useCallback } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  SidebarLabel,
  SidebarSpacer,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
  Avatar
} from 'verticals-ui';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  HomeIcon,
  InboxIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState<string>('/');

  const handleNavigation = useCallback(
    (path: string) => {
      setCurrentPath(path);
      navigate(path);
    },
    [navigate]
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <Dropdown>
          <DropdownButton as={SidebarItem} className="lg:mb-2.5">
            <Avatar src="/BrikLabsLogo.png" />
            <SidebarLabel>Brik Labs</SidebarLabel>
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
            <DropdownItem onClick={() => handleNavigation('/teams/1/settings')}>
              <Cog8ToothIcon />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => handleNavigation('/teams/1')}>
              <Avatar slot="icon" src="/tailwind-logo.svg" />
              <DropdownLabel>Tailwind Labs</DropdownLabel>
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation('/teams/2')}>
              <Avatar slot="icon" initials="WC" className="bg-purple-500 text-white" />
              <DropdownLabel>Workcation</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => handleNavigation('/teams/create')}>
              <PlusIcon />
              <DropdownLabel>New team&hellip;</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <SidebarSection className="max-lg:hidden">
          <SidebarItem onClick={() => handleNavigation('/search')} current={currentPath === '/search'}>
            <MagnifyingGlassIcon />
            <SidebarLabel>Search</SidebarLabel>
          </SidebarItem>
          <SidebarItem onClick={() => handleNavigation('/inbox')} current={currentPath === '/inbox'}>
            <InboxIcon />
            <SidebarLabel>Inbox</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <SidebarItem onClick={() => handleNavigation('/')} current={currentPath === '/'}>
            <HomeIcon />
            <SidebarLabel>Home</SidebarLabel>
          </SidebarItem>
          <SidebarItem onClick={() => handleNavigation('/transactions')} current={currentPath === '/transactions'}>
            <ArrowsRightLeftIcon />
            <SidebarLabel>Transactions</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
      </SidebarBody>
      <SidebarFooter className="max-lg:hidden">
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-3">
              <Avatar src="/profile-photo.jpg" className="size-10" square alt="" />
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Erica</span>
                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                  erica@example.com
                </span>
              </span>
            </span>
            <ChevronUpIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="top start">
            <DropdownItem onClick={() => handleNavigation('/my-profile')}>
              <UserIcon />
              <DropdownLabel>My profile</DropdownLabel>
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation('/settings')}>
              <Cog8ToothIcon />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => handleNavigation('/privacy-policy')}>
              <ShieldCheckIcon />
              <DropdownLabel>Privacy policy</DropdownLabel>
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigation('/share-feedback')}>
              <LightBulbIcon />
              <DropdownLabel>Share feedback</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => handleNavigation('/logout')}>
              <ArrowRightStartOnRectangleIcon />
              <DropdownLabel>Sign out</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
