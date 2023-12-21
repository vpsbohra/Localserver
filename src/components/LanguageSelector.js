import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
    const { i18n } = useTranslation();
  
    const handleChangeLanguage = (event) => {
      const selectedLanguage = event.target.value;
      i18n.changeLanguage(selectedLanguage);
    };
  
    return (
      <select onChange={handleChangeLanguage}>
        <option value="en">English</option>
        <option value="ar">Arabic</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
      </select>
    );
  }
  
  