interface JQuery {
    /** Attaches toolbar to specified element */
    toolbar(options: ToolbarOptions): JQuery;

    /** Obtain the element that wraps every tool button */
    getToolbarElement(): JQuery;
}

type ToolbarPosition = 'top' | 'bottom' | 'left' | 'right';
type ToolbarStyle = '' | 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'info-o' | 'dark' | 'light';
type ToolbarAnimation = 'standard' | 'flip' | 'grow' | 'flyin' | 'bounce';
type ToolbarEvent = 'click' | 'hover'

interface ToolbarOptions {

    /** JQuery selector of the element containing the icons HTML. */
    content: string,

    /** Indicates the display position of the toobar relative to the element its attached to. Select either 'top', 'bottom', 'left' or 'right. Default: top. */
    position?: ToolbarPosition,

    /** Style of the toolbar */
    style?: ToolbarStyle,

    /** Animation of the toolbar */
    animation?: ToolbarAnimation,

    /**  Indicates whether toolbar should appear on hover, or on click. Use the options 'click' or 'hover' */
    event?: ToolbarEvent,

    /** Indicates whether toolbar should hide when anywhere outside the toolbar is clicked. Use when the event option is set to click. */
    hideOnClick?: boolean,

    /** Adjustement for the position of where the toolbar appears (closer or further away from the element). 
     * It takes any positive integer. 
     * This will generally be used when attaching toolbars to elements other than standard buttons. */
    adjustment?: number
}