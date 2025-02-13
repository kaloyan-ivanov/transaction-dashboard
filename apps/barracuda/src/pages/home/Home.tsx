import { ChevronDownIcon } from '@heroicons/react/16/solid';
import React, { useCallback } from 'react';
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from 'verticals-ui';
import translationConfig from '../../translation/config';
import { useTranslation } from 'react-i18next';

function Home(): JSX.Element {
  const { t } = useTranslation();

  const switchToEN = useCallback(() => {
    translationConfig.changeLanguage('en');
  }, []);

  const switchToBG = useCallback(() => {
    translationConfig.changeLanguage('bg');
  }, []);

  return (
    <React.Fragment>
      <div>HOMEPAGE</div>
      <div>here will be some content</div>
      <Dropdown>
        <DropdownButton outline>
          {t('language')}
          <ChevronDownIcon />
        </DropdownButton>
        <DropdownMenu>
          <DropdownItem onClick={switchToBG}>BG</DropdownItem>
          <DropdownItem onClick={switchToEN}>EN</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}

export default Home;
