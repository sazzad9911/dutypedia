import React from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import SubHeader from "../../components/SubHeader";

export default function SupportDescription({ navigation, route }) {
  const title = route?.params?.title;
  const inset = useSafeAreaInsets();
  const index = route?.params?.index;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset?.top,
      }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 20,
          alignItems: "center",
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgXml xml={backIcon} />
        </Pressable>
        <Text
          style={{
            fontSize: 16,
            
            color: "#0B0B0B",
            fontWeight: "500",
            marginLeft: 10,
            flex: 1,
          }}>
          {title}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {index == 1 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}>
            <Text style={styles.text}>
              On our platform, sellers can withdraw their earnings easily and
              conveniently, with no limits on the amount they can withdraw.
              However, to initiate a withdrawal request, sellers must first
              verify their account, and we only accept bank withdrawals.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              Once their account is verified, sellers can request a withdrawal
              of any amount, with a minimum withdrawal limit of 50 BDT. It's
              important to note that only the amount for completed services will
              be added to the seller's withdrawal fund, indicating that the
              seller has successfully delivered the service to the buyer without
              any issues. If a service is not marked as complete, the amount
              will remain in the pending list.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              To initiate a withdrawal request, the seller can request a
              withdrawal for their available balance. Upon receiving the
              request, we will begin processing it within 3-7 business days.
              However, please note that the processing time may vary depending
              on the situation.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              To avoid any delays or issues with the withdrawal process, we
              strongly advise sellers to carefully review their account balance
              and ensure they have sufficient funds available before requesting
              a withdrawal.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              At our platform, we are committed to providing a transparent and
              hassle-free process for sellers to withdraw their earnings. By
              implementing account verification and a waiting period, we aim to
              ensure a secure and reliable platform for all users.
            </Text>
          </View>
        )}
        {index == 2 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}>
            <Text style={styles.text}>
              To ensure a secure and reliable transaction process, our platform
              requires sellers to provide proper delivery proof when delivering
              online services, such as receipts, files, lessons, or
              consultations. Sellers must take appropriate measures, such as
              taking screenshots or recording 10-20 second videos, to prove that
              the service has been delivered. Providing fake documents or proof
              is strictly prohibited and will result in the termination of the
              seller's account without any further discussion.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              In case a seller delivers all files to the buyer, but the buyer
              reports that they did not receive the service, we will investigate
              the matter and inquire from both parties. Both parties must
              cooperate with us and agree with our decision. If both parties do
              not agree with our decision, the platform will not allow them to
              place orders on our platform.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              We are committed to ensuring a smooth and transparent process for
              all users, and we take delivery proof seriously to ensure that
              both buyers and sellers are protected.
            </Text>
          </View>
        )}
        {index == 3 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}>
            <Text style={styles.text}>
              At Duty, we prioritize the security and protection of our
              customers' orders and transactions above all else, and we take
              this responsibility very seriously. As such, we have implemented a
              strict requirement for all sellers to provide proper delivery
              proof for all services they offer, whether they are physical or
              digital.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              For physical services such as tuition, lessons, consultation, home
              or office maintenance, or any other physical delivery activities,
              sellers must obtain proof of delivery. This entails the seller
              clicking on the "yes, I delivered" button in front of the buyer,
              as well as requesting the buyer to confirm that they have received
              the service satisfactorily by clicking on the "yes, I received"
              button. Additionally, the seller must upload delivery proof
              documents when they click the "yes, I delivered" button.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              If a seller utilizes an employee or labor to deliver the service,
              they must click on the "yes, I delivered" button in front of the
              buyer, and the employee or labor must request the buyer to click
              on the "yes, I received" button to confirm that the service has
              been delivered satisfactorily. Similarly, when the seller clicks
              the "yes, I delivered" button, they must also provide delivery
              proof documentation.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              At Duty, we strictly prohibit the use of any third-party delivery
              services, such as couriers, for the delivery of services or
              products. All transactions between buyers and sellers must be
              conducted face-to-face to ensure the safety and security of our
              users. If a buyer or seller uses any such third-party services and
              experiences any issues related to the product or service, Duty
              cannot be held responsible for any damages or losses.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              In such cases, Duty reserves the right to take appropriate action,
              including the termination of the seller's account and the
              refunding of the full amount to the buyer without any discussion.
              We take the safety and security of our users very seriously and
              maintain a zero-tolerance policy towards any violation of our
              terms.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              This policy is established to ensure the security and protection
              of our customers' orders and transactions. We firmly believe that
              providing proper delivery proof is essential for efficient and
              reliable service and to establish trust with buyers. Therefore, we
              mandate that sellers obtain proof of delivery and request the
              buyer to confirm receipt by clicking on the "yes, I received"
              button. Additionally, sellers must upload delivery proof
              documentation when clicking on the "yes, I delivered" button.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              To guarantee a secure transaction and avoid misunderstandings, it
              is absolutely critical for sellers to provide proper delivery
              proof. This will enable us to provide efficient and reliable
              service to our customers, while allowing sellers to build trust
              with their buyers.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              At Duty, we recognize the importance of professionalism and
              thorough testing in ensuring the effectiveness of our delivery
              process. As a result, we continually evaluate and enhance our
              delivery procedures to provide the best possible service to our
              customers.
            </Text>
          </View>
        )}
        {index == 4 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}>
            <Text style={styles.text}>
              If a seller is unable to fulfill an order, or if a buyer cancels
              an order after discussing it with our support center and has
              already made payment, we will issue a refund if the cancel order
              request is accepted. The full amount will be refunded to the
              buyer's account within 7-30 working days. Please note that the
              refund will be issued to the same account that was used to make
              the payment.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              However, depending on the circumstances, it may take longer to
              process the refund. Please note that some payment gateway
              providers, such as Bikash and other payment gateways, do not
              refund the chargeback fees that they charged. This is
              unfortunately beyond our control. We will notify the user on our
              platform once the refund is completed.
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
              Our team is committed to providing the best possible service to
              our customers and will make every effort to process refunds as
              quickly as possible. If you have any questions or concerns about
              our refund policy, please do not hesitate to contact our support
              team. For more details, please refer to our Order Policy section
            </Text>
          </View>
        )}
        {index == 5 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}>
            <Text style={styles.text}>
              Our platform does not allow for the delivery of the service via
              courier or any other means. Physical service delivery must be done
              face-to-face between the buyer and seller. To ensure the safety of
              all parties involved, we strongly recommend that the buyer and
              seller meet in a public place to exchange the service. If this is
              not possible, we advise that both parties take appropriate
              precautions to ensure a safe and secure exchange.
            </Text>
          </View>
        )}
        {index == 6 && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 4,
              paddingBottom: 32,
            }}>
            <Text style={styles.text}>
              On our platform, sellers can withdraw their earnings easily and
              conveniently, with no limits on the amount they can withdraw.
              However, to initiate a withdrawal request, sellers must first
              verify their account, and we only accept bank withdrawals. Once
              their account is verified, sellers can request a withdrawal of any
              amount, with a minimum withdrawal limit of 50 BDT. It's important
              to note that only the amount for completed services will be added
              to the seller's withdrawal fund, indicating that the seller has
              successfully delivered the service to the buyer without any
              issues. If a service is not marked as complete, the amount will
              remain in the pending list. To initiate a withdrawal request, the
              seller can request a withdrawal for their available balance. Upon
              receiving the request, we will begin processing it within 3-7
              business days. However, please note that the processing time may
              vary depending on the situation. To avoid any delays or issues
              with the withdrawal process, we strongly advise sellers to
              carefully review their account balance and ensure they have
              sufficient funds available before requesting a withdrawal. At our
              platform, we are committed to providing a transparent and
              hassle-free process for sellers to withdraw their earnings. By
              implementing account verification and a waiting period, we aim to
              ensure a secure and reliable platform for all users.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const backIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    
    fontWeight: "400",
    color: "#4D4E4F",
  },
});
