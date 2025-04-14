import React from 'react';
import { createStyles } from './styles';
import { ConfigPanelProps, ReadSpeed, DetailLevel } from '../types';

const ConfigPanel: React.FC<ConfigPanelProps> = ({ chatId, config, onConfigChange }) => {
  const { ConfigPanelContainer, ChatId, ConfigSection, ConfigTitle, SpeedOptions, SpeedOption, DetailOptions, DetailOption, BriefingInput } = createStyles();

  const handleReadSpeedChange = (speed: ReadSpeed) => {
    onConfigChange({ ...config, readSpeed: speed });
  };

  const handleDetailLevelChange = (level: DetailLevel) => {
    onConfigChange({ ...config, detailLevel: level });
  };

  const handleBriefingCountChange = (count: number) => {
    if (count >= 0 && count <= 30) {
      onConfigChange({ ...config, briefingCount: count });
    }
  };

  return (
    <ConfigPanelContainer>
      <ChatId>Chat ID: {chatId}</ChatId>
      
      <ConfigSection>
        <ConfigTitle>Read Speed</ConfigTitle>
        <SpeedOptions>
          {(['slow', 'normal', 'fast', 'very_fast'] as ReadSpeed[]).map((speed) => (
            <SpeedOption
              key={speed}
              $isActive={config.readSpeed === speed}
              onClick={() => handleReadSpeedChange(speed)}
            >
              {speed.charAt(0).toUpperCase() + speed.slice(1)}
            </SpeedOption>
          ))}
        </SpeedOptions>
      </ConfigSection>

      <ConfigSection>
        <ConfigTitle>Detail Level</ConfigTitle>
        <DetailOptions>
          {(['simple', 'basic', 'detailed', 'extensive'] as DetailLevel[]).map((level) => (
            <DetailOption
              key={level}
              $isActive={config.detailLevel === level}
              onClick={() => handleDetailLevelChange(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </DetailOption>
          ))}
        </DetailOptions>
      </ConfigSection>

      <ConfigSection>
        <ConfigTitle>Briefing Count</ConfigTitle>
        <BriefingInput
          type="number"
          min="0"
          max="30"
          value={config.briefingCount}
          onChange={(e) => handleBriefingCountChange(Number(e.target.value))}
        />
      </ConfigSection>
    </ConfigPanelContainer>
  );
};


export default ConfigPanel; 