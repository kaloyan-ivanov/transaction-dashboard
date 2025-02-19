import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  SidebarLabel,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
  Avatar,
  SidebarHeading
} from 'verticals-ui';
import {
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon,
  ReceiptRefundIcon,
  ExclamationCircleIcon,
  BuildingStorefrontIcon,
  CalculatorIcon,
  CheckBadgeIcon,
  IdentificationIcon
} from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import './sidebar.scss';
import { useTranslation } from 'react-i18next';
import { paths } from '../../appRoutes';

interface SideBarProps {
  toggleSidebar: () => void;
  isSidebarExpanded: boolean;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { toggleSidebar, isSidebarExpanded } = props;

  const { t } = useTranslation();

  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    /* set the current path initially after loading the app, not directly inside the use state
    to ensure proper selection highlighting even after sharing links or open the app after redirect */
    setCurrentPath(window.location.pathname);
  }, []);

  const handleNavigation = useCallback(
    (path: string) => {
      setCurrentPath(path);
      navigate(path);
    },
    [navigate]
  );

  const isPathSelected = useMemo(() => {
    return paths.reduce(
      (acc, path) => {
        acc[path] = currentPath === path;
        return acc;
      },
      {} as Record<string, boolean>
    );
  }, [currentPath]);

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
          {isSidebarExpanded && <SidebarHeading>{t('transactions')}</SidebarHeading>}
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={() => handleNavigation('/transactions')}
            current={isPathSelected['/transactions']}
          >
            <ArrowsRightLeftIcon className={isPathSelected['/transactions'] ? 'item-selected' : ''} />
            {isSidebarExpanded && <SidebarLabel>{t('transactions')}</SidebarLabel>}
          </SidebarItem>
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={() => handleNavigation('/operations')}
            current={isPathSelected['/operations']}
          >
            <ArrowPathIcon className={isPathSelected['/operations'] ? 'item-selected' : ''} />
            {isSidebarExpanded && <SidebarLabel>{t('operations')}</SidebarLabel>}
          </SidebarItem>
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={() => handleNavigation('/refunds')}
            current={isPathSelected['/refunds']}
          >
            <ReceiptRefundIcon className={isPathSelected['/refunds'] ? 'item-selected' : ''} />
            {isSidebarExpanded && <SidebarLabel>{t('refunds')}</SidebarLabel>}
          </SidebarItem>
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={() => handleNavigation('/disputes')}
            current={isPathSelected['/disputes']}
          >
            <ExclamationCircleIcon className={isPathSelected['/disputes'] ? 'item-selected' : ''} />
            {isSidebarExpanded && <SidebarLabel>{t('disputes')}</SidebarLabel>}
          </SidebarItem>
          {isSidebarExpanded && <SidebarHeading>{t('accounts')}</SidebarHeading>}
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={() => handleNavigation('/allAccounts')}
            current={isPathSelected['/allAccounts']}
          >
            <IdentificationIcon className={isPathSelected['/allAccounts'] ? 'item-selected' : ''} />
            {isSidebarExpanded && <SidebarLabel>{t('allAccounts')}</SidebarLabel>}
          </SidebarItem>
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={() => handleNavigation('/stores')}
            current={isPathSelected['/stores']}
          >
            <BuildingStorefrontIcon className={isPathSelected['/stores'] ? 'item-selected' : ''} />
            {isSidebarExpanded && <SidebarLabel>{t('stores')}</SidebarLabel>}
          </SidebarItem>
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={() => handleNavigation('/terminals')}
            current={isPathSelected['/terminals']}
          >
            <CalculatorIcon className={isPathSelected['/terminals'] ? 'item-selected' : ''} />
            {isSidebarExpanded && <SidebarLabel>{t('terminals')}</SidebarLabel>}
          </SidebarItem>
          <SidebarItem
            iconType="leading"
            contentLocation={contentLocation}
            onClick={() => handleNavigation('/complience')}
            current={isPathSelected['/complience']}
          >
            <CheckBadgeIcon className={isPathSelected['/complience'] ? 'item-selected' : ''} />
            {isSidebarExpanded && <SidebarLabel>{t('complienceAndRisk')}</SidebarLabel>}
          </SidebarItem>
        </SidebarSection>
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
