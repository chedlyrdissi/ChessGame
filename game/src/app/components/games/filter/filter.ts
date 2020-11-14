export interface FilterModel {
	list: any[];
	options: FilterOption[];
}

export interface FilterOption {
	label: string;
	property: string;
	value: any;
	propertyVerification: (val: any) => boolean;
}