export const formatKoreanDate = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}년${month}월${day}일`;
};

export const createNewChatTitle = (): string => {
  return `${formatKoreanDate()} 브리핑`;
}; 