// ✨ הוספת טיפוס לשדות של הטופס
export interface ArticleFormValues {
  title: string;
  subtitle: string; 
  content: string;
  // category: string;
  image: string;
  categoryname: string;
  categoryid:number
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'PUBLISHED';

}
export interface Category {
  code: number;
  name: string;
}


export interface Article {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  image: string;
  categoryname: string;
  authorName: string;
  datePublished: string;
    dateApproved:string;
   dateUpdate:string;
  views:number
}

export interface Articles {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  datePublished: string;
    dateApproved:string;
   dateUpdate:string;
  authorName: string;
}