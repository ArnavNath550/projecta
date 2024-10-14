import * as React from 'react'
import ListDialogItem from './list-dialog-item'
import Button from '@/app/packages/ui/button'
import { Tag } from '@/app/api/actions/issue-actions';

type Props = {
    list: Tag[];
    setIssueSelectedTags: (selectedTags: Tag[]) => void;
    setCloseTagSelectorDialog?: (openState: boolean) => void,
}

const TagSelectorDialog = (props: Props) => {
    const [selectedTags, setSelectedTags] = React.useState([]);
      const handleSelectTags = () => {
    // Loop through selectedTags and retrieve corresponding tag objects from props.list
    const selectedTagObjects = selectedTags.map(tagValue => {
      // Find the tag object that matches the current value in selectedTags
      return props.list.find(tag => tag.tag_id === tagValue);
    }).filter(tag => tag !== undefined); // Remove undefined values

    // Store the selected tag objects using setIssueSelectedTags
    props.setIssueSelectedTags(selectedTagObjects);
    props.setCloseTagSelectorDialog(false);
  };

    return (
        <div>
            <div className="p-5 pb-3">
                <div className="font-medium text-xl">Select a Tag</div>
                <div className="font-regular text-sm text-on-surface">Choose a tag to set for your issue</div>
            </div>
            {props.list.map((y) => {
                return <ListDialogItem id={y.tag_id} label={y.tag_name} colour={y.tag_colour} value={y.tag_value} setSelected={setSelectedTags} selected={selectedTags} />;
            })}
            <div className="flex items-center flex-row justify-center p-5">
                <Button intent="primary" size="base" onClick={() => handleSelectTags()}>Select Tags</Button>
            </div>
        </div>
    )
}

export default TagSelectorDialog;