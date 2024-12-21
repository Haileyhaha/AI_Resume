import {FloatingToolbar, ToolbarButton} from '../styles/AppStyles';

interface ToolbarProps {
    toolbarVisible :boolean;
    toolbarPosition: {top: number; left : number}
    changeTextColor: (color: string) => void;
    changeFontSize : (size: string) =>  void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    toolbarVisible,
    toolbarPosition,
    changeTextColor,
    changeFontSize,
}) => {
    if(!toolbarVisible) return null;

    return (
    <FloatingToolbar style={{top:toolbarPosition.top, left: toolbarPosition.left}}>
        <ToolbarButton onClick={()=> changeTextColor('red')}>Red</ToolbarButton>
        <ToolbarButton onClick={()=> changeTextColor('blue')}>Blue</ToolbarButton>
        <ToolbarButton onClick={()=> changeFontSize('16px')}>Small</ToolbarButton>
        <ToolbarButton onClick={()=> changeFontSize('24px')}>Large</ToolbarButton>
    </FloatingToolbar>
  )
}

export default Toolbar