import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneButton,
  PropertyPaneButtonType
} from '@microsoft/sp-webpart-base';

import { 
  PropertyFieldColorPicker, 
  PropertyFieldColorPickerStyle 
} from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';


import * as strings from 'ReactAccordionWebPartStrings';
import ReactAccordion from './components/ReactAccordion';
import { IReactAccordionProps } from './components/IReactAccordionProps';
//import styles from '../../../temp/workbench-packages/@microsoft_sp-webpart-workbench/lib/components/mobilePreview/mobilePreviewClickStopBar/MobilePreviewClickStopBar.module.scss';

export interface IReactAccordionWebPartProps {
  headerBackgroundColor: string;
  headerTextColor: string;
  questionBackgroundColor: string;
  questionTextColor: string;
  answerBackgroundColor: string;
  answerTextColor: string;
  listName: string;
  choice: string;
  title: string;
  displayMode: DisplayMode;
  maxItemsPerPage: number;
  updateProperty: (value: string) => void;
}

export default class ReactAccordionWebPart extends BaseClientSideWebPart<IReactAccordionWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactAccordionProps> = React.createElement(
      ReactAccordion,
      {
        headerBackgroundColor: this.properties.headerBackgroundColor,
        headerTextColor: this.properties.headerTextColor,
        questionBackgroundColor: this.properties.questionBackgroundColor,
        questionTextColor: this.properties.questionTextColor,
        answerBackgroundColor: this.properties.answerBackgroundColor,
        answerTextColor: this.properties.answerTextColor,
        listName: this.properties.listName,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        title: this.properties.title,
        displayMode: this.displayMode,
        maxItemsPerPage: this.properties.maxItemsPerPage,
        updateProperty: (value: string) => {
          this.properties.title = value;        
        }
      }
    );
    
    ReactDom.render(element, this.domElement);
    
      
    let headerStyle = `background-color: ${this.properties.headerBackgroundColor}; color: ${this.properties.headerTextColor}`;
    this.properties.headerBackgroundColor = headerStyle;
    /*
    let questionStyle = `background-color: ${this.properties.questionBackgroundColor}`;
    let questionTextStyle = `color: ${this.properties.questionTextColor} !important`;

    let answerStyle = `background-color: ${this.properties.answerBackgroundColor}; color: ${this.properties.answerTextColor}`;
    
    // Querying the dom and setting the styles of the elements
    this.domElement.querySelector("[class^='webPartTitle']").setAttribute("style", headerStyle );    
    // Set the pagination button style to header's style
    let buttons = this.domElement.querySelectorAll('button');
    for(let i = 0; i < buttons.length; i++){
      buttons[i].setAttribute('style', headerStyle);
    }

    let questions = this.domElement.querySelectorAll("[class^='accordion__title']");
    for(let i = 0; i < questions.length; i++) {
      questions[i].setAttribute("style", questionStyle);
      questions[i].querySelector('.accordion__arrow').setAttribute('style',questionTextStyle);
      questions[i].querySelector('h3').setAttribute("style", questionTextStyle);
    }    

    let answers = this.domElement.querySelectorAll("[class^='accordion__body']");
    for(let i = 0; i < answers.length; i++) {
      answers[i].setAttribute("style", answerStyle);
      let spans = answers[i].querySelectorAll('span');
      for(let k = 0; k < spans.length; k++) {
        spans[k].setAttribute("style", answerStyle);
      }
    }
    */   
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [        
        {
          header: {
            description: strings.PropertyPaneGeneralDescription
          }, 
          groups: [
            {
              groupName: strings.GeneralGroupName,
              groupFields: [                
                PropertyPaneTextField('listName', {
                  label: strings.ListNameLabel
                }),                
                PropertyPaneSlider('maxItemsPerPage', {
                  label: strings.MaxItemsPerPageLabel,
                  ariaLabel: strings.MaxItemsPerPageLabel,
                  min: 3,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                })              
              ]
            }
          ]
        },
        {
          header: {
            description: strings.PropertyPaneStyleDescription
          },
          groups: [
            {
              groupName: strings.StyleGroupName,
              groupFields: [
                PropertyFieldColorPicker('headerBackgroundColor', {
                  label: strings.HeaderBackgroundColorPickerLabelName,
                  selectedColor: this.properties.headerBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'headerBackgroundColorPicker'
                }),
                PropertyFieldColorPicker('headerTextColor', {
                  label: strings.HeaderTextColorPickerLabelName,
                  selectedColor: this.properties.headerTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'headerTextColorPicker'
                }),
                PropertyFieldColorPicker('questionBackgroundColor', {
                  label: strings.QuestionBackgroundColorPickerLabelName,
                  selectedColor: this.properties.questionBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'questionBackgroundColorPicker'
                }),
                PropertyFieldColorPicker('questionTextColor', {
                  label: strings.QuestionTextColorPickerLabelName,
                  selectedColor: this.properties.questionTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'questionTextColorPicker'
                }),
                PropertyFieldColorPicker('answerBackgroundColor', {
                  label: strings.AnswerBackgroundColorPickerLabelName,
                  selectedColor: this.properties.answerBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'answerBackgroundColor'
                }),
                PropertyFieldColorPicker('answerTextColor', {
                  label: strings.AnswerTextColorPickerLabelName,
                  selectedColor: this.properties.answerTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'answerTextColorPicker'
                })             
              ]
            }
          ]
        }
      ]
    };
  }
}
