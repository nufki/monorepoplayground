export interface AssetTag {
  id: string; // Unique id provided by the social service (NOT TO BE USED WHEN ROUTING!)
  referenceId: string; // The unique id of the asset as given by the banking service
  symbol: string; // The unique symbol key of the assets
  name: string; // The name of the asset as given by the banking service
  logo: string; // The referenced logo (image of the asset as given by the banking service)
  active: boolean; // The status of the asset (@TODO: To be implemented when inactivated)
  createdDate: Date; // The creation date of the tag
}
