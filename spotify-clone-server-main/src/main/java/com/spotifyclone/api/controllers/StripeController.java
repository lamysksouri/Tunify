package com.spotifyclone.api.controllers;

import com.spotifyclone.api.repositories.ResponseObject;
import com.spotifyclone.api.services.StripeService;
import com.spotifyclone.api.services.UserService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/stripe")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private UserService userService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, String> request) {
        String priceId = request.get("priceId");
        String username = request.get("username");
        try {
            Session session = stripeService.createCheckoutSession(priceId, username);
            Map<String, String> response = new HashMap<>();
            response.put("sessionId", session.getId());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/confirm-subscription")
    public ResponseEntity<ResponseObject> confirmSubscription(@RequestBody Map<String, String> request) {
        String sessionId = request.get("sessionId");
        System.out.println("Session ID: " + sessionId); // Log the session ID
        try {
            Session session = stripeService.retrieveSession(sessionId);
            System.out.println("Session: " + session); // Log the session details
            if ("complete".equals(session.getStatus()) && "paid".equals(session.getPaymentStatus())) {
                String username = session.getClientReferenceId();
                return userService.updateSubscriptionStatus(username, "PREMIUM");
            } else {
                return ResponseEntity.badRequest().body(new ResponseObject("400", "Payment not completed", null));
            }
        } catch (StripeException e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(500).body(new ResponseObject("500", "Stripe error", e.getMessage()));
        }
    }
}