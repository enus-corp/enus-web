import { styled } from "styled-components";


const ConfigPanelContainer = styled.div`
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatId = styled.div`
  font-size: 14px;
  color: #6C757D;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E0E0E0;
`;

const ConfigSection = styled.div`
  margin-bottom: 20px;
`;

const ConfigTitle = styled.h3`
  font-size: 16px;
  color: #252525;
  margin-bottom: 10px;
`;

const SpeedOptions = styled.div`
  display: flex;
  gap: 10px;
`;

const SpeedOption = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  background-color: ${props => props.$isActive ? '#A0D9B1' : '#FFFFFF'};
  color: ${props => props.$isActive ? '#FFFFFF' : '#252525'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$isActive ? '#8BC4A0' : '#F8F9FA'};
  }
`;

const DetailOptions = styled.div`
  display: flex;
  gap: 10px;
`;

const DetailOption = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  background-color: ${props => props.$isActive ? '#A0D9B1' : '#FFFFFF'};
  color: ${props => props.$isActive ? '#FFFFFF' : '#252525'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$isActive ? '#8BC4A0' : '#F8F9FA'};
  }
`;

const BriefingInput = styled.input`
  width: 100px;
  padding: 8px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #A0D9B1;
  }
`;

export const createStyles = () => ({
    ConfigPanelContainer,
    ChatId,
    ConfigSection,
    ConfigTitle,
    SpeedOptions,
    SpeedOption,
    DetailOptions,
    DetailOption,
    BriefingInput,
})