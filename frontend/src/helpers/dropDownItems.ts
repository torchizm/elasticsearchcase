import { DropDownItemList } from "elasticsearchcase";

export const DropDownItems: DropDownItemList = [
  {
    key: "_score",
    label: "Akıllı Sıralama (Eşleşme Skoru)",
  },
  {
    key: "name.first.keyword",
    label: "İsim",
  },
  {
    key: "dob.date",
    label: "Doğum Tarihi",
  },
  {
    key: "registered.date",
    label: "Kayıt Tarihi",
  },
];

export const OrderTypeItems: DropDownItemList = [
  {
    key: "desc",
    label: "Azalan (desc)",
  },
  {
    key: "asc",
    label: "Artan (asc)",
  },
];

export const SearchFields: DropDownItemList = [
  {
    key: "location.timezone.description",
    label: "Timezone Açıklaması",
  },
  {
    key: "login.username.keyword",
    label: "Kullanıcı Adı",
  },
  {
    key: "email.keyword",
    label: "E-Posta",
  },
  {
    key: "phone.keyword",
    label: "Telefon Numarası",
  },
  {
    key: "dob.age",
    label: "Doğum Tarihi",
  },
  {
    key: "regsitered.date",
    label: "Kayıt Tarihi",
  },
];
