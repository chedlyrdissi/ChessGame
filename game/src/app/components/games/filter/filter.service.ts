export interface FilterModel {
	groups: FilterGroup[];
}

export interface FilterOption {
	label: string;
	value: FilterOptionValue;
	property: string;
	select?: {
		choice: any,
		options: {label: string, value: any}[]
	};
}

export interface FilterGroup {
	label?: string;
	options: FilterOption[];
}

export class FilterApplied {
	constructor(public group: FilterGroup,public  option: FilterOption) {}
}

export class FilterOptionValue {
	prelabel?: boolean = false;
	type?: string;
	name?: string;
	min?: any;
	max?: any;
	defaultValue?: any;
	value?: any;
	placeholder?: string;
}

export class AppliedFilter {
	group: number;
	option: number;
	property: string;
	value?: string;
	select?: string | null;
} 

