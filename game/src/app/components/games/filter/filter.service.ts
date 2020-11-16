export interface FilterModel {
	groups: FilterGroup[];
}

export interface FilterOption {
	label: string;
	property: string;
	value: FilterOptionValue;
	propertyVerification: (val: any) => boolean;
}

export interface FilterGroup {
	label: string;
	options: FilterOption[];
}

export class FilterApplied {
	constructor(public group: FilterGroup,public  option: FilterOption) {}
}

export class FilterOptionValue {
	prelabel: boolean;
	type: string;
	name: string;
	min: any;
	max: any;
	defaultValue: any;
	value: any;
	placeholder: string;
}


