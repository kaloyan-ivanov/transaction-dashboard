import React, { useState, useCallback, useMemo, memo } from 'react';
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
  ChevronUpIcon,
  Cog8ToothIcon,
  HomeIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { useTranslation } from 'react-i18next';

interface SideBarProps {
  toggleSidebar: () => void;
  isSidebarExpanded: boolean;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { toggleSidebar, isSidebarExpanded } = props;

  const { t } = useTranslation();

  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  const handleNavigation = useCallback(
    (path: string) => {
      setCurrentPath(path);
      navigate(path);
    },
    [navigate]
  );

  const goToHomePage = useCallback(() => {
    setCurrentPath('/');
    navigate('/');
  }, [navigate]);

  const goToTransactionsPage = useCallback(() => {
    setCurrentPath('/transactions');
    navigate('/transactions');
  }, [navigate]);

  const isHomePageSelected = useMemo(() => currentPath === '/', [currentPath]);
  const isTransactionsPageSelected = useMemo(() => currentPath === '/transactions', [currentPath]);
  const contentLocation = useMemo(() => (!isSidebarExpanded ? 'centered' : undefined), [isSidebarExpanded]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarSection>
          <SidebarItem onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
            <Avatar src="/BrikLabsLogo.png" />
            {isSidebarExpanded && <SidebarLabel>Brik Labs</SidebarLabel>}
            {isSidebarExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={goToHomePage}
            current={isHomePageSelected}
          >
            <HomeIcon />
            {isSidebarExpanded && <SidebarLabel>{t('home')}</SidebarLabel>}
          </SidebarItem>
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={goToTransactionsPage}
            current={isTransactionsPageSelected}
          >
            <ArrowsRightLeftIcon />
            {isSidebarExpanded && <SidebarLabel>{t('transactions')}</SidebarLabel>}
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
      </SidebarBody>
      <SidebarFooter className="max-lg:hidden">
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-3">
              <Avatar src="/profile-photo.jpg" className="size-10" square alt="" />
              {isSidebarExpanded && (
                <span className="min-w-0">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Erica</span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    erica@example.com
                  </span>
                </span>
              )}
            </span>
            {isSidebarExpanded && <ChevronUpIcon />}
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

export default memo(SideBar);
