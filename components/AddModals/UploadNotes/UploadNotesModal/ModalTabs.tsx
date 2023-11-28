import React from 'react';

import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/tabs";
import ExtractedText from "@/components/AddModals/UploadNotes/UploadNotesModal/ExtractedText";
import Summary from "@/components/AddModals/UploadNotes/UploadNotesModal/Summary";

export enum TabIndex {
    ExtractedText = 0,
    Summary = 1
}

interface Props {
    extractedText: string;
    summary: string;
    tabIndex: TabIndex;
    setTabIndex: (index: TabIndex) => void;
}

const ModalTabs: React.FC<Props> = ({ extractedText, summary, tabIndex, setTabIndex }) => {
    return (
        <Tabs
            index={tabIndex}
            onChange={setTabIndex}
            w={'100%'}
            isFitted
            colorScheme={'brand'}
        >
            <TabList>
                <Tab>Extracted Text</Tab>
                <Tab>Summary</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <ExtractedText
                        text={extractedText}
                    />
                </TabPanel>
                <TabPanel>
                    <Summary
                        text={summary}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ModalTabs;
