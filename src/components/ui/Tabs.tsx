import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TabsContextType {
  activeValue: string;
  onValueChange: (value: string) => void;
}

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  style?: any;
}

interface TabsListProps {
  children: React.ReactNode;
  style?: any;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be rendered within a Tabs component');
  }
  return context;
};

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, style }) => {
  const [activeValue, setActiveValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeValue, onValueChange: setActiveValue }}>
      <View style={style}>{children}</View>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, style }) => (
  <View style={styles.tabsListWrapper}>
    <View style={[styles.tabsList, style]}>{children}</View>
  </View>
);

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, icon }) => {
  const { activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <TouchableOpacity
      style={[
        styles.tabTrigger,
        isActive && styles.tabTriggerActive,
      ]}
      onPress={() => onValueChange(value)}
    >
      {icon}
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const { activeValue } = useTabsContext();

  if (activeValue !== value) {
    return null;
  }

  return <View style={styles.tabsContentWrapper}>{children}</View>;
};


const styles = StyleSheet.create({
  tabsListWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 4,
    gap: 4,
    maxWidth: '100%', 
  },
  tabTrigger: {
    flex: 1, 
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80, 
  },
  tabTriggerActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f97316',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 4,
  },
  tabTextActive: {
    color: '#1f2937',
  },
  tabsContentWrapper: {
    flex: 1,
  },
});
