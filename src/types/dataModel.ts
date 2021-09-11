export interface ThisFileHasExport {}

declare global {
	namespace DM {

	}

	namespace DM.Product {
		interface Data {
			category: string;
			description: string;
			gender: Gender;
			howItWorks: string;
			id: string;
			ingredients: string;
			issueKinds: IssueKind[];
			name: string;
			nameOfMaker: string;
			reviews: SingleReview[];
		}

		type Gender = 'male' | 'female' | 'uni';

		interface IssueKind {
			countLeft: number;
			id: string;
			previewUrl: string;
			productId: string;
			productPrice: number;
			productSize: string;
			paymentType: IssuePaymentType;
		}

		type IssuePaymentType = 'subscription' | 'onetime';

		interface SingleReview {
			date: number;
			id: string;
			productId: string;
			productIssueTypeId: string;
			rating: number;
			text: string;
		}
	}
}